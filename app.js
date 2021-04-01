const favicon = require('serve-favicon');
const express = require("express");
const app = express();

const products = require("./lib/database.js");

app.use(favicon(__dirname + "/favicon.png"));
app.use(express.static(__dirname + "/dist/"));

const cache = {
    user: {
        products: {}
    }
};

const listingsMaxLimit = 15;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/dist/home.html");
})

app.get("/collection", (req, res) => {
    res.sendFile(__dirname + "/dist/collection.html");
})

app.get("/api/allproducts", (req, res) => {
    let descending = req.query.descending;
    let limit = listingsMaxLimit;
    if (req.query.limit) {
        if (req.query.limit < limit) {
            limit = parseInt(req.query.limit);
        }
    }
    let paginationStart = parseInt(req.query.paginationIdx);

    // Query database
    let data = products.map(d => {
        // Save this item in the user's cache for accessing later
        cache.user.products[d.id] = d;
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
    if (cache.user.products?.id) {
        data = cache.user.products.id
    }
    // Query database if not in cache
    else {
        data = products.find(l => l.id == id)
    }

    res.send(data);
})

app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/dist/collection.html");
})

app.listen(process.env.PORT || 3000, process.env.IP, () => console.log("Server started"));