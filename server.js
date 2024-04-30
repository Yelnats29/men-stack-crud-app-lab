const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const Dog = require("./models/dog.js");
const morgan = require("morgan");
const methodOverride = require("method-override");
const path = require("path");
const app = express();
app.use(express.urlencoded({ extended: false })); // This creates the req.body.
app.use(morgan('dev'));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
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
    res.render('allDogs.ejs', { dogs: allDogs });
});

// Show Route
app.get("/dogs/:dogsId", async (req, res) => {
    const foundDog = await Dog.findById(req.params.dogsId)
    res.render('dogview.ejs', { dog: foundDog })
});

// Delete (button on dogview.ejs)
app.delete("/dogs/:dogsId", async (req, res) => {
    await Dog.findByIdAndDelete(req.params.dogsId);
    res.redirect("/dogs")
});

// Edit (button on dogview.ejs)
app.get("/dogs/:dogsId/edit", async (req, res) => {
    const foundDog = await Dog.findById(req.params.dogsId);
    res.render('edit.ejs', { dog: foundDog })
});

// Updates
app.put("/dogs/:dogsId", async (req, res) => {
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
    await Dog.findByIdAndUpdate(req.params.dogsId, req.body);
    res.redirect('/dogs')
});



app.listen(3001, () => {
    console.log("Listening on port 3001");
});