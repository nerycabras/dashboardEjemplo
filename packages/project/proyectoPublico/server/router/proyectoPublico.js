// server/router/routes/signup.js
module.exports = function (mongoose) {
    var express = require('express');
    var router = express.Router();
    var models = require('../model/userModel')(mongoose);
    var Usuario = models.Usuario;
    
    
    
    router.get('/security', function (req, res) {
        console.log(req.session);
        res.send("true");
    });

    router.post('/altaUsuario', function (req, res) {

        var usuarioCrear = new Usuario(req.body);
        //buscar si existe el usuario
        Usuario.findOne({ 'usuario': usuarioCrear.usuario }, 'nombre', function (err, usuarioBusqueda) {
            if (err) return handleError(err);
            
            if (usuarioBusqueda == null) {
                //crear una instancia del usuario
                usuarioCrear.save(function (err, user_Saved) {
                    if (err) {
                        console.log(err);
                        throw err;
                    } else {
                        console.log('saved!');
                    }
                });
                console.log('Entro login');
            }else{
                 console.log('Usuario encontrado:', usuarioBusqueda.nombre) // Space Ghost is a talk show host.
                 res.json({ error: 'usuario ya existe' })
            }
            res.send();
        })

    });
    
    router.post('/login', function (req, res) {
        var ses= req.body;
        var usuarioCrear = new Usuario(req.body);
        //buscar si existe el usuario
        Usuario.findOne({ 'usuario': usuarioCrear.usuario ,'contrasenia':usuarioCrear.contrasenia}, 'nombre', function (err, usuarioBusqueda) {
            if (err) return handleError(err);
            if (usuarioBusqueda != null) {
               console.log("--------------------__>");
               console.log("Siiiii");
               
               
               req.session.logged=true;
               res.send("si");
            }else{
                console.log("--------------------__>");
                console.log("No");
               req.session.logged=false;
               res.send("no");
            }
            
        })
        
    });
    
    return router;
};




