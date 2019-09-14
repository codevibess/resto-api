const { promisify } = require('util');
const cheerio = require('cheerio');
const graph = require('fbgraph');
const { LastFmNode } = require('lastfm');
const tumblr = require('tumblr.js');
const GitHub = require('@octokit/rest');
const Twit = require('twit');
const stripe = require('stripe')(process.env.STRIPE_SKEY);
const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
const paypal = require('paypal-rest-sdk');
const lob = require('lob')(process.env.LOB_KEY);
const ig = require('instagram-node').instagram();
const axios = require('axios');
const Quickbooks = require('node-quickbooks');
const validator = require('validator');

const Table = require('../models/Table');
const Dish = require('../models/Dish');

exports.getTables = async (req, res, next) => {
const tables = await Table.find();

res.status(200).json(tables)
}



exports.addTable = async (req, res, next) => {

    const {number, status, capacity} = req.body

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
    const {newStatusOfTable, _id} = req.body

Table.findOneAndUpdate({ _id }, { status: newStatusOfTable }, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.status(205).json("succesfully updated table");
})
}


exports.addDish = async (req, res, next) => {

  const {name, type, price, description} = req.body

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
  const status = await Dish.findOneAndRemove({_id})

  res.status(200).json(status)
}



  exports.editDish = async (req, res, next) => {

    const { _id, ...dishInformation} = req.body
    

    console.log(req.body)
  
    Dish.findOneAndUpdate({ _id }, dishInformation, {upsert:true}, function(err, doc){
      if (err) return res.send(500, { error: err });
      return res.status(205).json("succesfully updated dish");
  })

    res.status(201).json(dish)
  }