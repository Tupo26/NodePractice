const express = require("express");
const app = express();

const port = process.env.PORT || 8080;

const endpoints = require("./routes/endpoints.js");
const locations = require("./routes/locations.js");

app.use(express.static("public"));

let router = express.Router();
// http://localhost:8080/endpoint/1
router.get("/1", (req, res) => {
    res.send("Tällä henkilöllä on id = 1");
});

//app.use("/endpoint", router);
app.use("/endpoint", endpoints);
app.use("/locations", locations);

//Middleware
// http://localhost:8080/endpoint/
app.use("/endpoint", (req, res, next) => {
    console.log(new Date(), req.method, req.url);
    next();
});

app.get("/endpoint", (req, res, next) => {
    res.send("HELLO WORLD!");
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
