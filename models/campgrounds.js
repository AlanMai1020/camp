//config
const mongoose = require("mongoose");

//create schema
const CampgroundSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    location: String
});

//export out the schema
module.exports = mongoose.model("Campground", CampgroundSchema);