const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const Dog = require("./models/dog.js");
const app = express();
app.use(express.urlencoded({ extended: false })); // This creates the req.body.
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Home Page
app.get("/", (req, res) => {
    res.render("home.ejs");
});

// GET /Dogs/new
app.get("/dogs/new", (req, res) => {
    res.render("newEntry.ejs");
});

// GET/Dogs
app.get("/dogs/view", (req, res) => {
    res.render("dogView.ejs");
});

// POST
app.post('/dogs', async (req, res) => {
    if (req.body.isGentleAroundPeople === "on") {
        req.body.isGentleAroundPeople = true;
    } else {
        req.body.isGentleAroundPeople = false;
    } 
    if (req.body.isGentleAroundAnimals === "on") {
        req.body.isGentleAroundAnimals = true;
    } else {
        req.body.isGentleAroundAnimals = false;
    } console.log(req.body);  
    await Dog.create(req.body);
    res.redirect('/dogs')
});

// READ - Retrieve All Fruit Data
app.get("/dogs", async (req, res) => {
    const allDogs = await Dog.find();
    res.send(allDogs);
  });




app.listen(3000, () => {
    console.log("Listening on port 3000");
});