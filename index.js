const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const db = [
    { id: 1, name: "Tuomas" },
    { id: 2, name: "Antti" },
    { id: 3, name: "Sanna" },
];

app.use(express.static("public"));

app.get("/endpoint", (req, res) => {
    res.send(db);
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
