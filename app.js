'use strict';

// simple express server
var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static(__dirname+"/src"));
app.get('/', function(req, res) {
    res.sendfile('index.html');
});
app.listen(3000, '0.0.0.0');
