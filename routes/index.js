var express = require('express');
var router = express.Router();
const gistController = require('../controllers/gist.controller');
const frameController = require('../controllers/frame.controller');

/* GET home page. */
router.get('/', function (req, res) {
  return res.render('index', { title: 'Github Repository Gist' });
});

router.get('/gist/*', gistController);

router.get('/framed/*', frameController);

router.get('*', (req, res) => {
  res.status(404).end('Not found!');
});

module.exports = router;
