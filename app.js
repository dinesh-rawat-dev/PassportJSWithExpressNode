var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');
var passport = require("passport");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', require('./routes/users'));
require('./bin/db')(mongoose);
require('./bin/passport')(passport)

var port = process.env.PORT || '3000';
app.set('port', port);
var server = http.createServer(app).listen(port);

module.exports = app;