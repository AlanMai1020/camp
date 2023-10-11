//configs
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campgrounds");
const methodOverride = require('method-override');

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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//start of routes
app.get("/", (req, res) => {
    res.render("home.ejs");
})

app.get("/campgrounds", async (req, res) => {
    const all_campgrounds = await Campground.find({});
    res.render("index.ejs", { all_campgrounds });
})

app.get("/campgrounds/new", (req, res) => {
    res.render("new_camp_form.ejs");
})

app.get("/campgrounds/:id", async (req, res) => {
    const camp_id = req.params.id;
    const camp = await Campground.findById(camp_id);
    res.render("show.ejs", { camp })
})

app.post("/campgrounds", async (req, res) => {
    const camp = new Campground(req.body.campground);
    await camp.save();
    res.redirect(`/campgrounds/${camp._id}`);
})

app.get("/campgrounds/:id/edit", async (req, res) => {
    const id = req.params.id;
    const camp = await Campground.findById(id);
    res.render("edit.ejs", { camp });
})

app.put("/campgrounds/:id", async (req, res) => {
    const id = req.params.id;
    const camp = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${camp._id}`);
})

app.delete("/campgrounds/:id", async (req, res) => {
    const id = req.params.id;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
})
//end of routes

app.listen(3000, () => {
    console.log("express working!");
})