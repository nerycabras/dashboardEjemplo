'use strict';
const NOMBRE_RAIZ_FRONT_END = "/component/";
const NOMBRE_JSON_FRONT_PAQUETES = 'frontPackage.json';
const PATH_CORE = __dirname+"/packages/core/";

// simple express server
var express = require('express');
var app = express();
var router = express.Router();

// se agrega este para poder leer los paquetes que se usaran para el front-end
var fs = require('fs');
// colores para console.lod
var colors = require('colors');



// funcion para leer los paquetes del node_modules y ponerlos automàtiamente
// como paquetes que puedan ser utilizados por el front-end
function leerPaquetesFrontEnd(){
	var obj;
	fs.readFile(NOMBRE_JSON_FRONT_PAQUETES, 'utf8', function (err, data) {
		  if (err) throw err;
		  obj = JSON.parse(data);
		  // leer los nombre de los paquetes y buscar carpetas
		  console.log(colors.green('Paquetes node_modules agregados al fron end express'));
		  for(var name in obj.frontDependencies) {
		  	app.use(NOMBRE_RAIZ_FRONT_END+name, 
		  		express.static(__dirname+'/node_modules/'+name));
			    console.log(
			    	colors.yellow(
			    	__dirname+'/node_modules/'+name+" ==> "+
			    	NOMBRE_RAIZ_FRONT_END+name
			    	));
			}

		  //leer proyecto inicial y hacerlos pùblicos
		  console.log(colors.green('proyectos inicial al fron end express'));
		  var proyectoInicial =obj.proyectosIncluidos.proyectoInicial;
		  var assetsPath=PATH_CORE+proyectoInicial+'/assets';
		  var assetsProject='/'+proyectoInicial+'/';

		  var routerPath=PATH_CORE+proyectoInicial+'/router/';
		  var routerProject='/'+proyectoInicial+'/router/';

		  var controllerPath= PATH_CORE+proyectoInicial+'/controller/';
		  var controllerProject='/'+proyectoInicial+'/controller/';

		  var viewsPath=PATH_CORE+proyectoInicial+'/views/';
		  var viewsProject='/'+proyectoInicial+'/views/';

		  app.use(assetsProject, 
		  		express.static(assetsPath));
		  app.use(routerProject, 
		  		express.static(routerPath));
		  app.use(controllerProject, 
		  		express.static(controllerPath));
		  app.use(viewsProject, 
		  		express.static(viewsPath));

		   console.log(
			    	colors.yellow(assetsPath +'==>'+assetsProject));
		   console.log(
			    	colors.yellow(routerPath +'==>'+routerProject));
		   console.log(
			    	colors.yellow(controllerPath +'==>'+controllerProject));
		   console.log(
			    	colors.yellow(viewsPath +'==>'+viewsProject));
		   console.log("--------------");
		   //console.log(app);

		});
}




//app.use("/",express.static(__dirname+"/packages/core/main/public/"));

// nombre de la carpeta donde se colocarà los archivos
//app.use(express.static(__dirname+"/src"));


// agregar paquetes por default al front end
leerPaquetesFrontEnd();

/*
app.get('/', function(req, res) {
    res.sendfile('/packages/core/main/public/views/index.html');
});
*/
app.listen(3000, '0.0.0.0');
