/*           index.js -- logic for route /  (site home page)              */

var express = require('express');
var router = express.Router();
var dataModel = require('../models/data-model.js');

/* The next four functions fetch data, and pass it on as part of req obj  */

function getAnnouncements(req, res, next) {
  req.announce = {};
  dataModel.readTable("announce", function(data) {
    req.announce = data;
    next();
  });
}

function getItems(req, res, next) {
  req.items = {};
  dataModel.readTable("items", function(data) {
    Object.keys(data).forEach(function (id) {
      let price = data[id].price;
      if (price % 100) {           /* if price is not whole dollar amount */
        price = (parseInt(price) / 100).toFixed(2);      /* include cents */
      } else {
        price = (parseInt(price) / 100);        /* otherwise omit decimal */
      }
      data[id].price = price;
    });
    req.items = data;
    next();
  });
}

function getEvents(req, res, next) {
  dataModel.readTable("events", function (data) {
    req.events = data;
    next();
  });
}

function getMotd(req, res, next) {
  dataModel.readTable("motd", function (data) {
    req.motd = data;
    next();
  });
}

/* Fetch data, render homepage                                            */

function renderPage(req, res) {
  res.render('index', {
    pagetitle: "Our Farm Stand",
    announcements: req.announce,
    items: req.items,
    events: req.events,
    motd: req.motd
  });
}

router.get('/',
  getAnnouncements, 
  getItems, 
  getEvents, 
  getMotd,
  renderPage
);

module.exports = router;