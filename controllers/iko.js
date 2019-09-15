const { promisify } = require('util');
const cheerio = require('cheerio');
const axios = require('axios');
const Quickbooks = require('node-quickbooks');
const validator = require('validator');

const Table = require('../models/Table');
const Dish = require('../models/Dish');
const Receipt = require('../models/Receipt');

exports.getTables = async (req, res, next) => {
  const tables = await Table.find();

  res.status(200).json(tables)
}



exports.addTable = async (req, res, next) => {

  const { number, status, capacity } = req.body

  const table = new Table({
    number,
    status,
    capacity,
  })


  table.save((err) => {
    if (err) { return next(err); }

  });
  console.log(table)
  res.status(201).json(table)
}

exports.changeStatusOfTable = async (req, res, next) => {
  const { newStatusOfTable, _id } = req.body

  Table.findOneAndUpdate(
    { _id },
    { status: newStatusOfTable },
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.status(205).json("succesfully updated table");
    })
}


exports.addDish = async (req, res, next) => {

  const { name, type, price, description } = req.body

  const dish = new Dish({
    name,
    type,
    price,
    description
  })


  dish.save((err) => {
    if (err) { return next(err); }

  });
  console.log(dish)
  res.status(201).json(dish)
}


exports.getDishes = async (req, res, next) => {
  const dishes = await Dish.find();

  res.status(200).json(dishes)
}


exports.removeDish = async (req, res, next) => {
  const _id = req.body
  const status = await Dish.findOneAndRemove({ _id })

  res.status(200).json(status)
}



exports.editDish = async (req, res, next) => {
  const { _id, ...dishInformation } = req.body

  Dish.findOneAndUpdate(
    { _id },
    dishInformation,
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.status(205).json("succesfully updated dish");
    })

  res.status(201).json(dish)
}



exports.getReceipt = async (req, res, next) => {
  const { _id } = req.body

  const receipt = await Receipt.findOne({ _id });

  res.status(200).json(receipt)
}


exports.getReceipts = async (req, res, next) => {
  const receipts = await Receipt.find();

  res.status(200).json(receipts)
}


exports.createReceipt = async (req, res, next) => {
  const { table, waiter } = req.body

  const receipt = new Receipt({
    table,
    waiter
  })

  receipt.save((err) => {
    if (err) { return next(err); }

  });
  res.status(201).json(receipt)

}

exports.addPositionToReceipt = async (req, res, next) => {

  const { _id, dishId } = req.body

  const dish = await Dish.findOne({ _id: dishId });

  Receipt.findOneAndUpdate(
    { _id },
    { items: dish },
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.status(205).json("succesfully added position to a receipt");
    })
}


exports.removePositionFromReceipt = async (req, res, next) => {

  const { _id, dishId } = req.body

  console.log(_id, dishId)
  Receipt.findOneAndUpdate(
    { _id },
    { $pull: { "items": { "_id": dishId } } },
    { multi: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.status(205).json("succesfully removed position from a receipt" + doc);
    })
}