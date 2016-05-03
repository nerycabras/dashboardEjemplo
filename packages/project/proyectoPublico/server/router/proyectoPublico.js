// server/router/routes/signup.js
module.exports = function (mongoose){
    var express = require('express');
    var router = express.Router();
    var models = require('../model/userModel')(mongoose);
    var Usuario=models.Usuario({ nombre: 'nery', contrasenia: 'nerypass' });
    console.log('---------------');
    router.post('/login', function (req, res) {
       Usuario.save(function(err, user_Saved){
            if(err){
                throw err;
                console.log(err);
            }else{
                console.log('saved!');
            }
        });
        console.log('Entro login');
        
        res.send();
    });
    return router;    
};
