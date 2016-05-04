// server/router/routes/signup.js
module.exports = function (mongoose) {
    var express = require('express');
    var router = express.Router();
    var models = require('../model/userModel')(mongoose);
    var Usuario = models.Usuario;
    router.get('/login', function (req, res) {
        var Usuario = models.Usuario(req.body);
        console.log(req.body.nombre);
        Usuario.save(function (err, user_Saved) {
            if (err) {
                console.log(err);
                throw err;
            } else {
                console.log('saved!');
            }
        });
        console.log('Entro login');
        res.send();
    });

    router.post('/login', function (req, res) {

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
    return router;
};
