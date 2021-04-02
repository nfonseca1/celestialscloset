import favicon from 'serve-favicon';
import express, { Application, Request, Response } from 'express';
import Database from "./lib/data";
import { IProduct, IUser, IComment } from "./lib/schemas";
import { verifyAdminToken } from './lib/database';

const app: Application = express();

app.use(favicon(__dirname + "/favicon.png"));
app.use(express.static(__dirname + "/dist/"));

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

app.get("/admin/:adminToken", (req, res) => {
    let token = req.params.adminToken;

    verifyAdminToken(token);
})

app.get("/admin", (req, res) => {
    res.send("Admin Login");
})

app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/dist/collection.html");
})

let PORT: number = parseInt(process.env.PORT);
app.listen(PORT || 3000, process.env.IP, () => console.log("Server started"));