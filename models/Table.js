const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  number: Number,
  status: Number,
  capacity: Number
  })

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
