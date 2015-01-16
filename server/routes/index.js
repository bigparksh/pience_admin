(function() {
  'use strict';
  var express = require('express');
  var router = express.Router();
  var noserv = require('./noserv');

  router.get('/', function(req, res) {
    res.render('index');
  });

  router.get('/api/aps', function(req, res) {
    noserv.noserv_get_aps(res);
  });

  router.post('/api/aps', function(req, res) {
    noserv.noserv_add_ap(req, res);
  });

  router.put('/api/aps', function(req, res) {
    noserv.noserv_update_ap(req, res)
  });

  router.delete('/api/aps/:_id', function(req, res) {
    noserv.noserv_delete_ap(req, res)
  });

  module.exports = router;

}());
