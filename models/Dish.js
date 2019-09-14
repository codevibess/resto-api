const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  description: String
  })

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
