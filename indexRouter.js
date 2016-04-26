/*
var express = require('express');
var router = express.Router();

router.use('/main/', require('./main'));


module.exports = router

*/

module.exports= function(direccionesRouterCore,direccionesRouterProject, rutaCore, rutaProject){
  var express = require('express');
  var router = express.Router();
  var colors = require('colors'); 
  
  //lee los elementos de core
  function forElementCore(element, index, array) {
      var proyectoNombre =element.proyectoNombre;
      var rutaNombre='/'+proyectoNombre+'/';
	  var esPublicoPrivado=element.tipoProyecto;
      var rutaCompleta='.'+rutaCore+proyectoNombre+'/server/router/'+proyectoNombre;
      console.log(colors.blue(rutaNombre)+"---->"+colors.magenta( rutaCompleta));
	  router.use(rutaNombre, require(rutaCompleta));
  }
  
  
   //lee los elementos de project
  function forElementProject(element, index, array) {
      var proyectoNombre =element.proyectoNombre;
      var rutaNombre='/'+proyectoNombre+'/';
	  var esPublicoPrivado=element.tipoProyecto;
      var rutaCompleta='.'+rutaProject+proyectoNombre+'/server/router/'+proyectoNombre;
      console.log(colors.blue(rutaNombre)+"---->"+colors.magenta( rutaCompleta));
	  router.use(rutaNombre, require(rutaCompleta));
  }
 
  //router.use('/main/', require('./main'));
  console.log(colors.magenta( '----------***************-----------'));
  console.log(colors.magenta( '-------------- WEB API -------------'));
  console.log(colors.magenta( '----------***************-----------'));
  //direccionesRouterCore.forEach(forElement);
  direccionesRouterCore.forEach(forElementCore);
  direccionesRouterProject.forEach(forElementProject);
  //router.use('/main/', require('./packages/core/main/server/router/main'));
  
  return router;
}