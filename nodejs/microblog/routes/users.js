var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.all('/:username', function(req, res, next) {
  // res.send('all methods captured');
  console.log('all methods captured');
  next();
});

router.get('/:username', function(req, res, next) {
  res.send('user: ' + req.params.username);
});

module.exports = router;
