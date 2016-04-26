// server/router/routes/signup.js

var express = require('express');
var router = express.Router();

// POST /signup
router.post('/login', function (req, res) {
    res.send('Audi, BMW, Mercedes');
});

// GET /signup/info
router.get('/logout', function (req, res) {
     res.send('Audi, BMW, Mercedes');
});


module.exports = router;