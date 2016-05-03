// server/router/routes/signup.js
module.exports = function (){
    var express = require('express');
    var router = express.Router();
    //var models = require('../model/userModel')(mongoose);
    // POST /signup
    
    router.post('/login', function (req, res) {
       /* var usuario = new models.Usuario({'nombre':'nery'},{'contrasenia':'pass'});
        
        usuario.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('meow');
        }
        });
        */
        console.log('Entro login');
        
        res.send();
    });
    return router;    
};
