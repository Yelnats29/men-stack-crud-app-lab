const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({
    name: String,
    age: Number,
    breed: String,
    color: String,
    weight: Number,
    gender: String,
    isGentleAroundPeople: Boolean,
    isGentleAroundAnimals: Boolean,
    description: String,
  });

const Dog = mongoose.model("Dog", dogSchema);

module.exports = Dog;