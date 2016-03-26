'use strict';
const NOMBRE_RAIZ_FRONT_END = "/component/";
const NOMBRE_JSON_FRONT_PAQUETES = 'frontPackage.json';


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
		});
}

// nombre de la carpeta donde se colocarà los archivos
app.use(express.static(__dirname+"/src"));

// agregar paquetes por default al front end
leerPaquetesFrontEnd();

app.get('/', function(req, res) {
    res.sendfile('index.html');
});
app.listen(3000, '0.0.0.0');
