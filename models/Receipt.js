const mongoose = require('mongoose');
const Dish = require('./Dish');

const receiptSchema = new mongoose.Schema({
  totalPrice: String,
  table: Number,
  waiter: String,
  items:[{}]
  })

const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;
