var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apiRouter = require('./routes/api');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
  res.status(200).json({
    instrucciones:[
      "Desarrollar los Elementos Solicitados en las Rutas Establecidas, Recuerde que el campo edad es numerico debe usar parseInt",
      "Crear en la carpeta docs deberá agregar una exportación de la colección de las pruebas de las rutas en postman",
      "Deberá agregar en la carpeta docs un screenshot de cada url probada en postman"
    ],
    rutas: [
      {
        url:"http://localhost:3000/api/personas/all",
        method:"get",
        params: {},
        body: {},
        observaciones:"Debe regresar todos los registro de personas"
      },
      {
        url: "http://localhost:3000/api/personas/one/:id",
        method: "get",
        params: ["id"],
        body: {},
        observaciones: "Debe regresar el registro de la persona identificada por id"
      },
      {
        url: "http://localhost:3000/api/personas/new",
        method: "post",
        params: {},
     //   body: {numeroidentidad, nombre, edad, genero, correo, telefono},
        observaciones: "Debe agregar una nueva persona a la tabla"
      },
      {
        url: "http://localhost:3000/api/personas/upd/:id",
        method: "put",
        params: ["id"],
       // body: { numeroidentidad, nombre, edad, genero, correo, telefono },
        observaciones: "Debe actualizar los datos en el registro de la persona"
      },
      {
        url: "http://localhost:3000/api/personas/del/:id",
        method: "delete",
        params: ["id"],
        body: {},
        observaciones: "Debe eliminar el registro de la persona"
      }
    ]
  })
});
app.use('/api', apiRouter);
module.exports = app;
