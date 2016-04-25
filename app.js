'use strict';
const NOMBRE_RAIZ_FRONT_END = "/component/";
const NOMBRE_JSON_FRONT_PAQUETES = 'frontPackage.json';
const PATH_CORE = __dirname+"/packages/core/";
const PATH_PROJECT = __dirname+"/packages/project/";
const PATH_WEB_PUBLICO = 'public';
const PATH_WEB_PRIVATE = 'private';

// simple express server
var express = require('express');
var app = express();
var router = express.Router();

// se agrega este para poder leer los paquetes que se usaran para el front-end
var fs = require('fs');
// colores para console.lod
var colors = require('colors');

var bodyParser  = require('body-parser');
//console morgan
var morgan  = require('morgan');
//validator

var validator = require('express-validator');

// express session
var session = require('express-session');

var FileStore = require('session-file-store')(session);

	//leer proyectos de core
function leerProyectosCore(element, index, array) {
	console.log(colors.yellow("proyecto ==>")+colors.blue(element.proyectoNombre));
	var proyectoNombre =element.proyectoNombre;

	var esPublicoPrivado=element.tipoProyecto;
	var cadenaPrivadaPublico='';
	

	if(esPublicoPrivado=="publico"){
		cadenaPrivadaPublico='public';
	}else if(esPublicoPrivado=="privado"){
		cadenaPrivadaPublico='private';
	}
	


	var assetsPath=PATH_CORE+proyectoNombre+'/public/assets';
	var assetsProject='/'+cadenaPrivadaPublico+'/'+proyectoNombre+'/';




	var routerPath=PATH_CORE+proyectoNombre+'/public/router/';
	var routerProject='/'+cadenaPrivadaPublico+'/'+proyectoNombre+'/router/';

	var controllerPath= PATH_CORE+proyectoNombre+'/public/controller/';
	var controllerProject='/'+cadenaPrivadaPublico+'/'+proyectoNombre+'/controller/';

	var viewsPath=PATH_CORE+proyectoNombre+'/public/views/';
	var viewsProject='/'+cadenaPrivadaPublico+'/'+proyectoNombre+'/';

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
}

//leer proyectos de project
function leerProyectosProject(element, index, array) {
	console.log(colors.yellow("proyecto ==>")+colors.blue(element.proyectoNombre));
	var proyectoNombre =element.proyectoNombre;
	var esPublicoPrivado=element.tipoProyecto;
	var cadenaPrivadaPublico='';
	if(esPublicoPrivado=="publico"){
		cadenaPrivadaPublico='public';
	}else if(esPublicoPrivado=="privado"){
		cadenaPrivadaPublico='private';
	}

	var assetsPath=PATH_PROJECT+proyectoNombre+'/public/assets';
	var assetsProject='/'+cadenaPrivadaPublico+'/'+proyectoNombre+'/';

	var routerPath=PATH_PROJECT+proyectoNombre+'/public/router/';
	var routerProject='/'+cadenaPrivadaPublico+'/'+proyectoNombre+'/router/';

	var controllerPath= PATH_PROJECT+proyectoNombre+'/public/controller/';
	var controllerProject='/'+cadenaPrivadaPublico+'/'+proyectoNombre+'/controller/';

	var viewsPath=PATH_PROJECT+proyectoNombre+'/public/views/';
	var viewsProject='/'+cadenaPrivadaPublico+'/'+proyectoNombre+'/';

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
}






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
		  var proyectosCore =obj.proyectosIncluidos.core
		  proyectosCore.forEach(leerProyectosCore);
		  var proyectosProject =obj.proyectosIncluidos.project
		  proyectosProject.forEach(leerProyectosProject);
		});
}
//config body parser

leerPaquetesFrontEnd();

//config morgan
app.use (morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

//config express session

app.use(session({
  secret: 'max',
  saveUninitialized: false,
  resave: false
}));

app.use(function printSession(req, res, next) {
  console.log('req.session', req.session);
  return next();
});




//app.use("/",express.static(__dirname+"/packages/core/main/public/"));

// nombre de la carpeta donde se colocarà los archivos
//app.use(express.static(__dirname+"/src"));


// agregar paquetes por default al front end
//leerPaquetesFrontEnd();


/*app.get('/', function(req, res) {
});*/

app.listen(3000, '0.0.0.0');
