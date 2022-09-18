//DEFINICION DEL CONTROLADOR USUARIO
//utilizar nuevas características de javascript
'use strict'
var date = Date.now();
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var requestCart = require('../models/requestCart'); //cargar el modelo docente
var Business = require('../models/business'); //cargar el modelo docente
var jwt = require('../services/jwt'); //cargar el servicio
var fs = require('fs'); //libreria file sistem de node
var path = require('path'); //permite trabajar con rutas de sistemas de ficheros
var nodemailer = require("nodemailer"); //libreria para el envio de correos
var smtpTransport = nodemailer.createTransport({
	service: "Gmail",
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {

		user: "mywayjayjim86gmail.com",
		pass: "mywayemamat@44"

	}
});
var rand, mailOptions, host, link, email_docente;
//REGISTRAR SOLICITUDES
function registerCart(req, res) {
	var params = req.body;
	var requestcart = new requestCart();
	console.log("Ingresando a saveRequest ...")
	if (params.total!=0, params.request) {
		requestcart.name= params.name.toUpperCase();
		requestcart.contact = params.contact;
		requestcart.date = params.date;
		requestcart.request = params.request;
		requestcart.total = params.total;
		requestcart.completed = false;
		//controlar docente duplicado
		//guardar docente
		requestcart.save((err, requestCartStored) => {
			if (err) {
				return res.status(400).send({
					message: 'Error en la peticion enviar solicitud ' + String(err)
				});
			}

			if (requestCartStored) {
				//sendEmailVerification(user.email, req.get('host'));
				res.status(200).send({
					status: 'success',
					requestCart: requestCartStored.id,
					message: 'Solicitud enviada con éxito'
				});
			} else {
				res.status(200).send({
					status: 'fail',
					message: 'No se ha registrado la solicitud'
				});
			}
		});
	} else {
		res.status(200).send({
			status: 'empty',
			message: 'Envía todos los campos'
		});
	}
}
function searchCode(req, res) {
	var code = req.params.code;
		requestCart.findById(code, (err, found) => {
			if (err) {
				return res.status(200).send({
					message: 'Error en la peticion enviar solicitud ' + String(err)
				});
			}

			if (found) {
				console.log(found)
				res.status(200).send({
					status: 'success',
					found: found.request,
					message: 'Solicitud enviada con éxito'
				});
			} else {
				res.status(200).send({
					status: 'fail',
					message: 'No se ha registrado la solicitud'
				});
			}
		});
}
//LOGIN

module.exports = {
	registerCart,
	searchCode
}