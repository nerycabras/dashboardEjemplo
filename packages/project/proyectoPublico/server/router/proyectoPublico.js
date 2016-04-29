// server/router/routes/signup.js

var express = require('express');
var router = express.Router();

// POST /signup
router.post('/login', function (req, res) {
    console.log('Entro login');
    res.send('correcto');   
});



module.exports = router;