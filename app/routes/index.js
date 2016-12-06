var express = require('express');
var route = express.Router();
/* GET home page. */
route.get('/', function(req, res, next) {
	res.render('index', { title: 'Welcome to your monthly sky bill.'});
});

module.exports = route;
