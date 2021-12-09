const express = require("express");
const app = express();

const http = require("http");

const port = process.env.PORT || 8080;

const server = http.createServer((request, response) => {
    response.end("Mikki hiiri");
});

server.listen(port, () =>
    console.log(`Server listening port ${server.address().port}`)
);
