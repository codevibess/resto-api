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


exports.getTables = async (req, res, next) => {
const tables = await Table.find();

res.status(200).json(tables)
};

exports.changeStatusOfTable = async (req, res, next) => {
    const {newStatusOfTable, _id} = req.body

    console.log(newStatusOfTable, _id, req.body)
//    const table = Table.update({ _id }, {$set:{status:newStatusOfTable}})
//     console.log(table)
    // res.status(203).json(table)

Table.findOneAndUpdate({ _id }, { status: newStatusOfTable }, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
});
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