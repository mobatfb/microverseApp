//DEFINICION DE RUTAS USUARIO

//utilizar nuevas características de javascript
'use strict'

var express = require('express');
var requestCartController = require('../controllers/requestCart');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();

//middleware para subir archivos
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'}); //aqui se guardarán las imagenes que usa el usuario
api.post('/registercart', requestCartController.registerCart);
api.get('/searchcode/:code', requestCartController.searchCode);
module.exports = api; //exportar todas las rutas