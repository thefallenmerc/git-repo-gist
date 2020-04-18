var express = require('express');
var router = express.Router();
const gistController = require('../controllers/gist.controller');

/* GET home page. */
router.get('/', function (req, res, next) {
  return res.render('index', { title: 'Github Repository Gist' });
});

router.get('*', gistController);

module.exports = router;
