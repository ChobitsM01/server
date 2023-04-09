
import express from "express";
let path = require('path');

const configViewEngine = (app) =>
{
    app.use(express.static('./src/public'));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}

export default configViewEngine;