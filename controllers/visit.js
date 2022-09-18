//DEFINICION DEL CONTROLADOR USUARIO
//utilizar nuevas características de javascript
'use strict'
var ObjectId = require('mongodb').ObjectID;
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var Visit = require('../models/visit'); //cargar el modelo docente
var jwt = require('../services/jwt'); //cargar el servicio
var rand, mailOptions, host, link, email_docente;
//GENERAR VISITA
function genVisit(req, res) {
	const date = Date.now();
	const hoy = new Date(date);
	var visit = new Visit();
	visit.ip = req._remoteAddress
    visit.device=req.headers['user-agent']
	visit.date=hoy
	//guardar visita
	visit.save((err, visitStored) => {
		if (err) {
			return res.status(400).send({
				message: 'Error en la peticion guardar el registro ' + String(err)
			});
		}
		if (visitStored) {
			res.status(200).send({
				visit: visitStored,
				message: 'Registrado con Exito'
			});
		} else {
			res.status(200).send({
				message: 'No se logro registrar'
			});
		}
	});

}

module.exports = {
	genVisit,
}
