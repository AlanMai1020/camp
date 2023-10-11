//configs
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campgrounds");

//connect to database
mongoose.connect("mongodb://127.0.0.1:27017/camp")
    .then(() => {
        console.log("Connected");
    })
    .catch(() => {
        console.log("Connection Error");
    });

//config views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//routes
app.get("/", (req, res) => {
    res.render("test.ejs");
})

app.get("/newcampground", async (req, res) => {
    const camp = new Campground({ title: 'Zion' });
    await camp.save();
    console.log(camp);
})

app.listen(3000, () => {
    console.log("express working!");
})