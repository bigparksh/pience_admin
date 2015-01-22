(function() {
  'use strict';
  var express = require('express');
  var router = express.Router();
  var noserv_ap = require('./noserv_ap');
  var noserv_tenant = require('./noserv_tenant');

  router.get('/', function(req, res) {
    res.render('index');
  });

  router.post('/login', function(req, res) {
    noserv_tenant.login(req, res);
  });

  router.post('/logout', function(req, res) {
    noserv_tenant.logout(req, res);
  });

  router.get('/aps', function(req, res) {
    console.log(req.session.userName);
    if (req.session.userName) {
      noserv_ap.get(req, res);
    } else {
      res.json("null");
    }
  });

  router.post('/aps', function(req, res) {
    noserv_ap.post(req, res);
  });

  router.put('/aps', function(req, res) {
    noserv_ap.modify(req, res);
  });

  router.delete('/aps/:_id', function(req, res) {
    noserv_ap.delete(req, res);
  });

  module.exports = router;

}());
