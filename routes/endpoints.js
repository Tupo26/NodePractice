const express = require("express");
let endpoints = express.Router();
let autoincrement = 0;
let db = [
    { id: ++autoincrement, name: "Tuomas" },
    { id: ++autoincrement, name: "Antti" },
    { id: ++autoincrement, name: "Sanna" },
];

endpoints.use(express.json());

let regex = new RegExp("/[a-z]/");
let regex1 = /[a-z]/;

endpoints.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("Time:", Date.now());
    next();
});

// http://localhost:8080/endpoint/1
endpoints.get("/:id([0-9]+)", (req, res) => {
    console.log(req.params.id);

    let id = Number(req.params.id);

    let temp = null;

    for (let end of db) {
        if (end.id === id) {
            temp = end;
        }
    }

    let end = db.find((end) => end.id === id);

    if (end) res.send(end);
    else res.status(404).send({ msg: "No entry found with id: " + id });
});

// http://localhost:8080/endpoint/
endpoints.get("/", (req, res) => {
    res.send(db);
});

endpoints.post("/", (req, res) => {
    let end = req.body;
    end.id = ++autoincrement;
    db.push(end);
    res.status(201).send(end);
});

endpoints.delete("/:id([0-9]+)", (req, res) => {
    let id = Number(req.params.id);
    let newDB = [];

    // for (let end of db) {
    //     if (end.id !== id) {
    //         newDB.push(end);
    //     }
    // }

    newDB = db.filter((end) => end.id !== id);

    if (newDB.length < db.length) {
        db = newDB;
        res.status(204).end();
    } else {
        res.status(404).send({ msg: "No entry found with id: " + id });
    }
});

module.exports = endpoints;
