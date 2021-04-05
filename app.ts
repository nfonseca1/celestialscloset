import favicon from 'serve-favicon';
import express, { Application, Request, Response } from 'express';
import session from 'express-session';
import memorystore from 'memorystore';
import multer from 'multer';
import Database from "./lib/data";
import { v4 as uuidv4 } from 'uuid';
import { IProduct, IUser, IComment, IRequest, IProductInfoList } from "./lib/schemas";
import { verifyAdminToken, createUser, removeAdminToken, getUser, uploadPhoto, createProduct, getLists, updateLists } from './lib/database';
import { validateName, validatePassword, validateUsername, validateNewListItem } from './lib/validation';

const app: Application = express();
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(favicon(__dirname + "/favicon.png"));
app.use(express.static(__dirname + "/dist/"));

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

interface ICache {
    products?: {
        [id: string]: IProduct
    },
    user?: IUser
}
let cache: ICache = {
    products: {

    }
};

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

app.get("/api/allproducts", (req: Request<{}, {}, {}, {
    descending: string,
    limit: string,
    paginationIdx: string
}>, res) => {
    // Query params
    let descending = req.query.descending == 'true';
    let limit = listingsMaxLimit; // Default limit
    if (req.query.limit) {
        let parsedLimit = parseInt(req.query.limit);
        if (parsedLimit < limit) {
            limit = parsedLimit;
        }
    }
    let paginationStart = parseInt(req.query.paginationIdx);

    // Query database
    let data = Database.Products.map(d => {
        // Save this item in the user's cache for accessing later
        cache.products[d.id] = d;
        return {
            id: d.id,
            title: d.title,
            price: d.price,
            photos: d.photos,
            date: d.date
        }
    }).slice(paginationStart, paginationStart + limit)

    let listings = descending ? data.reverse() : data;
    res.send({ paginationIdx: paginationStart + limit, listings });
})

app.get("/api/product", (req, res) => {
    let id = req.query.id;

    let data = {}
    // Check cache
    if (cache.products?.id) {
        data = cache.products.id
    }
    // Query database if not in cache
    else {
        data = Database.Products.find(l => l.id == id)
    }

    res.send(data);
})

app.get("/admin/home", (req, res) => {
    res.sendFile(__dirname + "/dist/admin.html");
})

app.get("/admin/listings/new", (req, res) => {
    res.sendFile(__dirname + "/dist/admin.html");
})

app.post("/admin/listings/new", upload.any(), (req, res) => {
    let id = uuidv4();
    let s3Files = [];
    for (let i = 0; i < req.files.length; i++) {
        let photo = (req.files as any)[i];
        let dotChunks = photo.originalname.split(".");
        let extension = dotChunks[dotChunks.length - 1].toLowerCase();

        if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') continue;

        let s3File = `${id}-${i}.${extension}`;
        s3Files.push(s3File);
        uploadPhoto(photo.buffer, s3File);
    }

    let price = isNaN(parseFloat(req.body.price)) ? null : parseFloat(req.body.price)
    let productInfo: IProductInfoList = {
        inactive: req.body.inactive,
        title: req.body.title,
        price: price,
        description: req.body.description,
        stones: JSON.parse(req.body.stones),
        chakras: JSON.parse(req.body.chakras),
        benefits: JSON.parse(req.body.benefits),
        hideStones: req.body.hideStones,
        hideChakras: req.body.hideChakras,
        hideBenefits: req.body.hideBenefits
    }
    createProduct(productInfo, id, s3Files)
        .then(created => {
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
                    updateLists(lists.stones, lists.benefits);
                }
            }
        })
})

app.get("/admin/lists", (req, res) => {
    if (lists.stones.length > 0 && lists.benefits.length > 0) {
        res.send({ stones: lists.stones, benefits: lists.benefits });
    }
    else {
        getLists()
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

app.get("/admin/:adminToken", (req: IRequest, res) => {
    let token = req.params.adminToken;

    verifyAdminToken(token)
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

    getUser(username)
        .then(user => {
            if (user) {
                res.redirect('/admin/' + req.session.adminToken);
            }
            else {
                createUser({
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
                            removeAdminToken(req.session.adminToken);
                        }
                        else {
                            res.send('Admin creation failed. Please try again in a minute or contact developer');
                        }
                    })
            }
        })
})

app.get("/admin", (req, res) => {
    res.send("Admin Login");
})

app.get("/p/*", (req, res) => {
    res.sendFile(__dirname + "/dist/collection.html");
})

let PORT: number = parseInt(process.env.PORT);
app.listen(PORT || 3000, process.env.IP, () => console.log("Server started"));