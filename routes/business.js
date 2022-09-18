
'use strict'

var express = require('express');
var BusinessController = require('../controllers/business');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();


//api.get('/listar-servicios', md_auth.ensureAuth , ServiceController.getServices);
api.post('/createbusiness', BusinessController.createBusiness);
api.get('/readbusiness/:aux', BusinessController.readBusiness);
api.put('/updatebusiness/:id', md_auth.ensureAuth, BusinessController.updateBusiness);
api.delete('/deletebusiness/:id', md_auth.ensureAuth,BusinessController.deleteBusiness);
//api.get('/listar-sesion/:id', md_auth.ensureAuth, ServiceController.getSession);
//api.get('/obtener-maxsesiones', md_auth.ensureAuth, ServiceController.getNumMaxSession);
module.exports = api; //exportar todas las rutas