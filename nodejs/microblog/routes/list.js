var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('list', {
    title: 'List',
    items: [1991, 'Jason', 'express', 'Node.js']
  });
});

module.exports = router;
