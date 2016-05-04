// server/router/routes/signup.js
module.exports = function (mongoose){
    var express = require('express');
    var router = express.Router();
    var models = require('../model/userModel')(mongoose);
    router.post('/login', function (req, res) {
    var Usuario=models.Usuario(req.body);
    console.log(req.body.nombre);
    Usuario.save(function(err, user_Saved){
            if(err){
                console.log(err);
                throw err;
            }else{
                console.log('saved!');
            }
        });
     console.log('Entro login');   
     res.send();
    });
    return router;    
};
