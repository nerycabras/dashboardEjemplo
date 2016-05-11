'use strict';
const NOMBRE_RAIZ_FRONT_END = "/component/";
const NOMBRE_JSON_FRONT_PAQUETES = 'frontPackage.json';
const PATH_CORE = __dirname+"/packages/core/";
const PATH_PROJECT = __dirname+"/packages/project/";
const PATH_SERVER_ROUTER_PRIVATE ="/packages/core/";
const PATH_SERVER_ROUTER_PUBLIC = "/packages/project/";
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

var cookieParser = require('cookie-parser');

var mongoose = require('mongoose');
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

var MongoStore = require('connect-mongo')(session);

var mailer = require('express-mailer');


var proyectosCore=[];
var proyectosProject=[];

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
	
	var servicePath=PATH_CORE+proyectoNombre+'/public/service/';
	var serviceProject='/'+cadenaPrivadaPublico+'/'+proyectoNombre+'/service/';
	
	var modulePath=PATH_CORE+proyectoNombre+'/public/module/';
	var moduleProject='/'+cadenaPrivadaPublico+'/'+proyectoNombre+'/module/';

	app.use(assetsProject, 
	express.static(assetsPath));
	app.use(routerProject, 
	express.static(routerPath));
	app.use(controllerProject, 
	express.static(controllerPath));
	app.use(serviceProject, 
	express.static(servicePath));
	
	app.use(moduleProject, 
	express.static(modulePath));
	
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
	console.log(
		colors.yellow(servicePath +'==>'+serviceProject));
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
	var assetsProject='/'+cadenaPrivadaPublico+'/'+proyectoNombre+'/assets';

	var routerPath=PATH_PROJECT+proyectoNombre+'/public/router/';
	var routerProject='/'+cadenaPrivadaPublico+'/'+proyectoNombre+'/router/';

	var controllerPath= PATH_PROJECT+proyectoNombre+'/public/controller/';
	var controllerProject='/'+cadenaPrivadaPublico+'/'+proyectoNombre+'/controller/';

	var viewsPath=PATH_PROJECT+proyectoNombre+'/public/views/';
	var viewsProject='/'+cadenaPrivadaPublico+'/'+proyectoNombre+'/';

	var servicePath=PATH_PROJECT+proyectoNombre+'/public/service/';
	var serviceProject='/'+cadenaPrivadaPublico+'/'+proyectoNombre+'/service/';
	
	var modulePath=PATH_PROJECT+proyectoNombre+'/public/module/';
	var moduleProject='/'+cadenaPrivadaPublico+'/'+proyectoNombre+'/module/';
	

	app.use(assetsProject, 
	express.static(assetsPath));
	
	app.use(routerProject, 
	express.static(routerPath));
	
	app.use(controllerProject, 
	express.static(controllerPath));
	
	app.use(serviceProject, 
	express.static(servicePath));
	
	app.use(moduleProject, 
	express.static(modulePath));
	
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
	console.log(
		colors.yellow(servicePath +'==>'+serviceProject));
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
		  proyectosCore =obj.proyectosIncluidos.core
		  proyectosCore.forEach(leerProyectosCore);
		  proyectosProject =obj.proyectosIncluidos.project
		  proyectosProject.forEach(leerProyectosProject);
		  
		  // procesamiento de las rutas express
		  app.use('/webapi/',
		  	require('./indexRouter')
		  	(proyectosCore,proyectosProject,PATH_SERVER_ROUTER_PRIVATE,PATH_SERVER_ROUTER_PUBLIC,mongoose));
		});
}


mailer.extend(app, {
  from: 'nery.210689@gmail.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'nerycabras',
    pass: 'avvae3e4'
  }
});



//config morgan
app.use (morgan('dev'));
/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser());*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());





//app.use(validator());

//config express session

/*app.use(session({
    cookie: { maxAge: 1000*60*2 } ,
    secret: "session secret" ,
    store:new MongoStore({
            db: 'dashboard',
            host: '127.0.0.1',
            port: 27017,   
            collection: 'session', 
            auto_reconnect:true
    })
}));

*/
// configuracion de session
app.use(session({
			cookie: { maxAge: 1000*60*2 } ,
			secret: "session secret" ,
			store: new MongoStore({ 
				mongooseConnection: mongoose.connection,
				ttl: 2 * 24 * 60 * 60 
			})
		}));

app.use(function printSession(req, res, next) {
  console.log('req.session', req.session);
  return next();
});


// session example
function sessionValidacion(req, res, next) {
  if (req.user === 'farmer') {
   next()
  } else {
    res.status(403).send('Forbidden')
  }
}
leerPaquetesFrontEnd();



app.listen(3000, '0.0.0.0');
