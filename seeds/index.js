//configs
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedNames');
const Campground = require('../models/campgrounds');

//connect to database
mongoose.connect("mongodb://127.0.0.1:27017/camp")
    .then(() => {
        console.log("Connected");
    })
    .catch(() => {
        console.log("Connection Error");
    });

//takes a random value from the array
const sample = array => array[Math.floor(Math.random() * array.length)];

//fill database with populated campsites
const seedDB = async () => {
    await Campground.deleteMany({}); //deletes everything currently inside db
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
};

//close connection to db after success populating
seedDB().then(() => {
    mongoose.connection.close();
})