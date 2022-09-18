//DEFINICION DE RUTAS USUARIO

//utilizar nuevas características de javascript
'use strict'

var express = require('express');
var visitController = require('../controllers/visit');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();

api.post('/genvisit', visitController.genVisit);
module.exports = api; //exportar todas las rutas