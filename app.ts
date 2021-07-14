import express, { Application } from 'express';
import session from 'express-session';
import memorystore from 'memorystore';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import expressStaticGzip from 'express-static-gzip';
import { IProduct, IRequest, IProductInfoList } from "./lib/schemas";
import database from './lib/database';
import { validateName, validatePassword, validateUsername, validateNewListItem } from './lib/validation';

const app: Application = express();
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

app.use(expressStaticGzip(__dirname + "/dist/", {
    enableBrotli: true,
    index: false,
    orderPreference: ['br', 'gz']
}));

let upload = multer();

let MemoryStore = memorystore(session);
app.use(session({
    secret: "Shhh, it's a secret..",
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({
        checkPeriod: 86400000
    })
}))

const listingsMaxLimit = 15;

let lists: {
    stones: string[],
    benefits: string[]
} = {
    stones: [],
    benefits: []
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/dist/home.html");
})

app.get("/collection", (req, res) => {
    res.sendFile(__dirname + "/dist/collection.html");
})

app.get("/instagram", (req, res) => {
    res.sendFile(__dirname + "/dist/collection.html");
})

app.get("/cart", (req, res) => {
    res.sendFile(__dirname + "/dist/collection.html");
})

app.get("/api/allproducts", (req: IRequest, res) => {
    // Query params
    let descending = req.query.descending == 'true';
    let limit = listingsMaxLimit; // Default limit
    if (req.query.limit) {
        let parsedLimit = parseInt(req.query.limit as string);
        if (parsedLimit < limit) {
            limit = parsedLimit;
        }
    }
    let inActive = req.query.inActive === 'true';

    // Query database
    let pKey = null;
    if (req.query.paginationKey && req.query.paginationKey !== 'null' && req.query.paginationKey !== 'undefined') {
        pKey = JSON.parse(req.query.paginationKey as string);
    }
    else if (req.query.paginationKey === 'undefined') {
        res.send({ listings: [], paginationKey: undefined, CDN: process.env.CLOUDFRONT_DOMAIN });
        return;
    }

    database.getProducts(limit, descending, inActive, pKey)
        .then((data: any) => {
            data.Items.map((d: IProduct) => {
                return {
                    id: d.id,
                    title: d.title,
                    price: d.price,
                    photos: d.photos,
                    date: d.date
                }
            })
            let paginationKey = data.LastEvaluatedKey;

            res.send({ listings: data.Items, paginationKey: paginationKey, CDN: process.env.CLOUDFRONT_DOMAIN });
        })
})

app.get("/api/product", (req: IRequest, res) => {
    let id: string = req.query.id as string;

    database.getProductById(id)
        .then(data => {
            res.send({ data, CDN: process.env.CLOUDFRONT_DOMAIN });
        })

})

app.get("/api/paymentSettings", (req, res) => {
    database.getPaymentSettings()
        .then(settings => {
            res.send(settings);
        })
})

app.post("/api/cart", (req: IRequest, res) => {
    if (!req.session.cart) req.session.cart = {};
    req.session.cart[req.body.id] = req.body.data;
    req.session.save();
})

app.get("/admin/home", (req: IRequest, res) => {
    if (!req.session.user) {
        res.redirect("/admin");
    }
    else {
        res.sendFile(__dirname + "/dist/admin.html");
    }
})

app.get("/admin/listings/new", (req: IRequest, res) => {
    if (!req.session.user) {
        res.redirect("/admin");
    }
    else {
        res.sendFile(__dirname + "/dist/admin.html");
    }
})

app.post("/admin/listings/new", upload.any(), (req, res) => {
    let id = req.body.id || uuidv4();

    let s3Files = [];
    for (let i = 0; i < req.files.length; i++) {
        let photo = (req.files as any)[i];
        let dotChunks = photo.originalname.split(".");
        let extension = dotChunks[dotChunks.length - 1].toLowerCase();

        if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') continue;

        let s3File = `${id}-${i}.${extension}`;
        s3Files.push(s3File);
        database.uploadPhoto(photo.buffer, s3File);
    }

    let price = isNaN(parseFloat(req.body.price)) ? null : parseFloat(req.body.price)
    let productInfo: IProductInfoList = {
        isActive: req.body.isActive,
        title: req.body.title,
        description: req.body.description,
        stones: JSON.parse(req.body.stones),
        chakras: JSON.parse(req.body.chakras),
        benefits: JSON.parse(req.body.benefits),
        options: JSON.parse(req.body.options)
    }
    // Add the price if there is one set
    if (price) productInfo.price = price;

    let dbAction;
    if (req.body.id) {
        dbAction = database.updateProduct(productInfo, id, s3Files);
    }
    else {
        dbAction = database.createProduct(productInfo, id, s3Files);
    }

    dbAction.then((created: boolean) => {
        if (created) {
            let newStones = [];
            for (let stone of productInfo.stones) {
                let valid = validateNewListItem(lists.stones, stone);
                if (valid) newStones.push(valid);
            }
            let newBenefits = [];
            for (let benefit of productInfo.benefits) {
                let valid = validateNewListItem(lists.benefits, benefit);
                if (valid) newBenefits.push(valid);
            }

            if (newStones.length > 0 || newBenefits.length > 0) {
                lists.stones.push(...newStones);
                lists.benefits.push(...newBenefits);
                database.updateLists(lists.stones, lists.benefits);
            }
        }
    })
})

app.post("/admin/listings/delete", (req, res) => {
    let id = req.body.id;
    database.deleteProduct(id)
        .then(() => {
            res.redirect("/admin/home");
        })
})

app.get("/admin/lists", (req, res) => {
    if (lists.stones.length > 0 && lists.benefits.length > 0) {
        res.send({ stones: lists.stones, benefits: lists.benefits });
    }
    else {
        database.getLists()
            .then(data => {
                if (lists.stones.length === 0) {
                    lists.stones = data.stones;
                }
                if (lists.benefits.length === 0) {
                    lists.benefits = data.benefits;
                }
                res.send({ stones: lists.stones, benefits: lists.benefits })
            })
    }
})

app.get("/admin/payments", (req: IRequest, res) => {
    if (!req.session.user) {
        res.redirect("/admin");
    }
    else {
        res.sendFile(__dirname + "/dist/admin.html");
    }
})

app.get("/admin/:adminToken", (req: IRequest, res) => {
    let token = req.params.adminToken;

    database.verifyAdminToken(token)
        .then(verification => {
            if (verification) {
                req.session.adminToken = verification;
                res.sendFile(__dirname + "/dist/adminRegistration.html");
            }
            else {
                res.send("Token not valid or has expired");
            }
        })
})

app.post("/admin/register", (req: IRequest, res) => {
    let username = req.body.username.trim();
    let firstname = req.body.firstname.trim();
    let lastname = req.body.lastname.trim();
    let password = req.body.password.trim();

    let errors: string[] = [];
    errors.push(validateUsername(username));
    errors.push(validateName(firstname));
    errors.push(validateName(lastname));
    errors.push(validatePassword(password));

    for (let err of errors) {
        if (err !== '') {
            res.redirect('/admin/' + req.session.adminToken);
            return;
        }
    }

    database.getUser(username)
        .then(user => {
            if (user) {
                res.redirect('/admin/' + req.session.adminToken);
            }
            else {
                database.createUser({
                    username: username,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    isAdmin: true
                })
                    .then(newUser => {
                        if (newUser) {
                            req.session.user = newUser;
                            req.session.save(() => {
                                res.redirect('/admin/home');
                            })
                            database.removeAdminToken(req.session.adminToken);
                        }
                        else {
                            res.send('Admin creation failed. Please try again in a minute or contact developer');
                        }
                    })
            }
        })
})

app.get("/admin", (req, res) => {
    res.sendFile(__dirname + "/dist/adminLogin.html");
})

app.post("/admin", (req: IRequest, res) => {
    let username = req.body.username;

    database.getUser(username)
        .then(data => {
            if (data?.username) {
                bcrypt.compare(req.body.password, data.passwordHash)
                    .then(match => {
                        if (match) {
                            req.session.user = data;
                            res.redirect("/admin/home");
                        }
                        else {
                            res.redirect("/admin");
                        }
                    })
            }
            else {
                res.redirect("/admin");
            }
        })
        .catch(e => {
            console.error(`Failed to check user with username: ${username} \n`, e);
            res.send("An error occurred. Please try again in a minute or contact the developer if the issue persists.");
        })
})

app.get("/p/*", (req, res) => {
    res.sendFile(__dirname + "/dist/collection.html");
})

let PORT: number = parseInt(process.env.PORT);
app.listen(PORT || 3000, process.env.IP, () => console.log("Server started"));