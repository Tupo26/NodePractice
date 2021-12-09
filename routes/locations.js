const express = require("express");
let locations = express.Router();

let autoincrement = 0;
let db = [
    { id: ++autoincrement, latitude: 60, longitude: 60 },
    { id: ++autoincrement, latitude: 40, longitude: 10 },
    { id: ++autoincrement, latitude: 30, longitude: 70 },
];

locations.use(express.json());

locations.use((req, res, next) => {
    //res.header("Access-Control-Allow-Origin", "*");
    console.log("Time:", Date.now());
    next();
});

// http://localhost:8080/locations/
locations.get("/", (req, res) => {
    res.send(db);
});

// http://localhost:8080/locations/1
locations.get("/:id([0-9]+)", (req, res) => {
    console.log(req.params.id);

    let id = Number(req.params.id);

    let loc = db.find((loc) => loc.id === id);

    if (loc) {
        res.send(loc);
    } else {
        res.status(404).send({ msg: "No entry found with id: " + id });
    }
});

locations.delete("/:id([0-9]+)", (req, res) => {
    let id = Number(req.params.id);
    let newDB = [];

    newDB = db.filter((loc) => loc.id !== id);

    if (newDB.length < db.length) {
        db = newDB;
        res.status(204).end();
    } else {
        res.status(404).send({ msg: "No entry found with id: " + id });
    }
});

locations.post("/", (req, res) => {
    let loc = req.body;
    console.log(req.body);
    loc.id = ++autoincrement;
    db.push(loc);
    res.status(201).send(loc);
});

module.exports = locations;
