
'use strict'

var express = require('express');
var ServiceController = require('../controllers/services');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();

//api.get('/listar-servicios', md_auth.ensureAuth , ServiceController.getServices);
api.post('/createservice', ServiceController.createSevice);
api.get('/readservice/:id', ServiceController.readService);
api.put('/updateservice/:id', ServiceController.updateService);
api.post('/deleteservice/:id', ServiceController.deleteService);
//api.get('/listar-sesion/:id', md_auth.ensureAuth, ServiceController.getSession);
//api.get('/obtener-maxsesiones', md_auth.ensureAuth, ServiceController.getNumMaxSession);
module.exports = api; //exportar todas las rutas