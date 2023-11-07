const express = require("express")
const cors = require("cors")
const app = express()
const mongoose = require('mongoose');

app.use(cors())

app.use(express.json())

const conn = require('./db/conn');

conn();

// Routes
const routes = require("./routes/router")

app.use("/api", routes);


app.listen(3000, function () {
  console.log("Servidor online!")
})
