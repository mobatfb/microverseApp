//DEFINICION DEL CONTROLADOR USUARIO
//utilizar nuevas características de javascript
'use strict'
var date = Date.now();
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var User = require('../models/users'); //cargar el modelo docente
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
//var url="http://localhost:4200/";
//var url="http://192.168.1.12:4200/";
//var url="http://192.168.1.5:4200/";
function home(req, res) {
	res.status(200).send({
		message: 'Hola mundo desde el servidor node js'
	});
}
function pruebas(req, res) {
	console.log(req.body);
	res.status(200).send({
		message: 'Acción de pruebas en el servidor node js'
	});
}
//REGISTRAR SOLICITUDES
function saveRequest(req, res) {
	var params = req.body;
	var request = new Request();
	console.log("Ingresando a saveRequest ...")
	if (params.name && params.lastname && params.email && params.phone) {
		request.name = params.name.toUpperCase();
		request.lastname = params.lastname.toUpperCase();
		request.email = params.email;
		request.phone = params.phone;
		request.service = params.service;
		request.subservice = params.subservice;
		request.active = false;
		//controlar docente duplicado
		//guardar docente
		request.save((err, requestStored) => {
			if (err) {
				return res.status(400).send({
					message: 'Error en la peticion enviar solicitud ' + String(err)
				});
			}

			if (requestStored) {
				//sendEmailVerification(user.email, req.get('host'));
				res.status(200).send({
					status: 'success',
					request: requestStored,
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
//LOGIN
function loginUser(req, res) {
	var params = req.body;
	_validData()
	function _validData() {
		if (!(params.email && params.password)) {
			return res.status(200).send({
				status: "warning",
				message: 'Envía todos los campos'
			})
		} else {
			_getUser();
		}
	}
	function _getUser() {
		var email = params.email.toLowerCase();
		var password = params.password;
		User.findOne({ email: email }, (err, userData) => {
			if (err) {
				return res.status(500).send({ message: "Error en la petición" });
			}
			if (userData) {
				bcrypt.compare(password, userData.password, (err, check) => {
					if (check) {
						if (params.gettoken) {
							//generar y devolver token
							return res.status(200).send({
								token: jwt.createToken(userData),
							});
						} else {
							//devolver datos del usuario
							if (!userData.valid) {
								return res.status(200).send({ userId: userData.id });
							} else {
								return res.status(200).send({ message: "Usted a recibido un mensaje de validación en el correo: " + user.email });
							}

						}
					} else {
						return res.status(200).send({ status: "warning", message: "Clave incorrecta" });
					}
				});
			} else {
				return res.status(200).send({ message: "Correo no registrado" });
			}
		});
	}
}
//REGISTRAR USUARIO
function createUser(req, res) {
	var params = req.body;
	_validData()
	function _validData() {
		if (!(params.username && params.email && params.password)) {
			return res.status(200).send({
				status: "warning",
				message: 'Envía todos los campos'
			})
		} else {
			_validDoubleEmail()
		}
	}
	function _validDoubleEmail() {
		User.findOne(
			{ email: params.email.toLowerCase() },
		).exec((err, user) => {
			if (err) {
				return res.status(200).send({
					status: 'error',
					message: 'Error en la petición de registro ' + String(err)
				});
			}
			if (user) {
				return res.status(200).send({
					status: 'warning',
					message: 'El correo que intentas registrar ya existe'
				});
			} else {
				_validDoubleName()
			}
		})

	}
	function _validDoubleName() {
		User.findOne(
			{ username: params.username.toLowerCase() },
		).exec((err, user) => {
			if (err) {
				return res.status(200).send({
					status: 'error',
					message: 'Error en la petición de registro ' + String(err)
				});
			}
			if (user) {
				return res.status(200).send({
					status: 'warning',
					message: 'El nombre de usuario que intentas registrar ya existe'
				});
			} else {
				_setObjetc()
			}
		})
	}

	function _setObjetc() {
		var user = new User();
		user.name = params.username
		user.username = params.username.toLowerCase()
		user.email = params.email.toLowerCase();
		const hoy = new Date(date);
		user.datecreated = hoy
		user.pos = { x: 1, y: 1, z: 1 }
		user.active = false
		user.valid = false
		bcrypt.hash(params.password, null, null, (err, hash) => {
			user.password = hash;
			_save(user)
		})
	}
	function _save(user) {
		user.save((err, user) => {
			if (err) {
				return res.status(200).send({ status: "error", message: 'Error en la petición' });
			}
			else if (!user) {
				return res.status(200).send({ status: "error", message: 'No se ha registrado el usuario' });
			}
			else {
				return res.status(200).send({
					status: "success",
					user: user.email,
					message: user.email + " registrado con exito"
				})
			}
		})
	}
}
//ACTUALIZAR UN USUARIO
function updateUser(req, res) {
	var userId = req.params.id;
	var comboId = req.body.comboId;
	var chars = "0123456789abcdefghijklmnopqrstuvwyz";
	var password = "";
	for (var i = 0; i <= 4; i++) {
		var randomNumber = Math.floor(Math.random() * chars.length);
		password += chars.substring(randomNumber, randomNumber + 1);
	}
	req.body.combo.code = password
	var update = req.body;
	//borrar propiedad password
	delete update.password;
	//controlar docente duplicados
	User.find({
		$or: [
			{ email: update.email },
		]
	}).exec((err, users) => {
		var existe_docente = false;
		err = ""
		users.forEach((user) => {
			if (user && user._id != userId) {
				existe_docente = true;
			}
		});

		if (existe_docente) {
			console.log('Los datos ya están en uso');
			return res.status(200).send({ message: 'Los datos ya están en uso' });
		}

		//new:true => muestra info del docente actualizada
		//new:false => muestra info del docente desactualizada
		console.log("a guard:", update)
		User.updateOne(
			{
				"_id": userId,
				"combos._id": comboId
			}, {
			$set: { 'combos.$.title': update.combo.title, 'combos.$.info': update.combo.info, 'combos.$.date': update.combo.date, 'combos.$.code': update.combo.code, 'combos.$.act': update.combo.act }
		}
			, (err, userUpdated) => {
				if (err) {
					return res.status(500).send({ message: 'Error en la petición' });
				}
				if (!userUpdated) {
					return res.status(404).send({ message: 'No se ha podido actualizar el docente' });
				}
				return res.status(200).send({
					status: "success",
					user: userUpdated,
					message: "Registro actualizado con éxito !!"
				});
			});
	});
}
//ACTIVAR UN USUARIO
function activateUser(req, res) {
	var params = req.body;
	_validData()
	function _validData() {
		if (!params.id) {
			return res.status(200).send({
				status: "warning",
				message: 'Envía todos los campos'
			})
		} else {
			_verifyActive()
		}
	}
	function _verifyActive() {
		User.findById(
			params.id
		).exec((err, found) => {
			if (err) {
				return res.status(200).send({
					status: 'error',
					message: 'Error en la petición de registro ' + String(err)
				});
			}
			if (found) {
				if (found.active == true) {
					return res.status(200).send({
						status: 'success',
						activated: true,
						pos: found.pos
					});
				} else {
					_activeUser()
				}
			} else {
				return res.status(200).send({
					status: 'error',
					message: 'xError en la petición de registro ' + String(err)
				});
			}
		})
	}
	function _activeUser() {
		User.updateOne(
			{
				"_id": params.id,
			}, {
			$set: { 'active': true }
		}
			, (err, userActivated) => {
				console.log(userActivated)
				if (err) {
					return res.status(500).send({ message: 'Error en la petición' });
				}
				if (!userActivated) {
					return res.status(404).send({ message: 'No se ha podido actualizar el docente' });
				}else{
					_verifyActive()
				}
			});

	}
}
//CONSEGUIR UN USUARIO
function readUser(req, res) {
	var userName = req.params.name.toLowerCase();
	User.findOne({ username: userName }, (err, userData) => {
		if (err) {
			return res.status(200).send({ status: "error", message: 'Error en la petición' });
		}
		if (userData) {
			var user = {
				name: userData.name,
				id: userData.id,
				lastname: userData.lastname,
				username: userData.username,
				cname: userData.cname,
				cemail: userData.cemail,
				cphone: userData.cphone,
				occupation: userData.occupation,
				address: userData.address,
				image: userData.image,
				banner: userData.banner,
				country: userData.country,
				city: userData.city,
				zone: userData.zone,
				datebirth: userData.datebirth,
				datecreated: userData.datecreated,
				valid: userData.valid
			}
			return res.status(200).send({ user: user, status: "warning", message: 'existe' });
		} else {
			return res.status(200).send({ status: "warning", message: 'No encontrado el negocio' });
		}
	});
}
//Edición de datos de docente
function xupdateUser(req, res) {
	var userId = req.params.id;
	var comboId = req.body.comboId;
	var chars = "0123456789abcdefghijklmnopqrstuvwyz";
	var password = "";
	for (var i = 0; i <= 4; i++) {
		var randomNumber = Math.floor(Math.random() * chars.length);
		password += chars.substring(randomNumber, randomNumber + 1);
	}
	req.body.combo.code = password
	var update = req.body;
	//borrar propiedad password
	delete update.password;
	//controlar docente duplicados
	User.find({
		$or: [
			{ email: update.email },
		]
	}).exec((err, users) => {
		var existe_docente = false;
		err = ""
		users.forEach((user) => {
			if (user && user._id != userId) {
				existe_docente = true;
			}
		});

		if (existe_docente) {
			console.log('Los datos ya están en uso');
			return res.status(200).send({ message: 'Los datos ya están en uso' });
		}

		//new:true => muestra info del docente actualizada
		//new:false => muestra info del docente desactualizada
		console.log("a guard:", update)
		User.updateOne(
			{
				"_id": userId,
				"combos._id": comboId
			}, {
			$set: { 'combos.$.title': update.combo.title, 'combos.$.info': update.combo.info, 'combos.$.date': update.combo.date, 'combos.$.code': update.combo.code, 'combos.$.act': update.combo.act }
		}
			, (err, userUpdated) => {
				if (err) {
					return res.status(500).send({ message: 'Error en la petición' });
				}
				if (!userUpdated) {
					return res.status(404).send({ message: 'No se ha podido actualizar el docente' });
				}
				return res.status(200).send({
					status: "success",
					user: userUpdated,
					message: "Registro actualizado con éxito !!"
				});
			});
	});
}
//Eliminar USUARIO
function deleteUser(req, res) {
	var userId = req.params.id
	User.findOneAndDelete({ _id: userId }, (err, user) => {
		if (err) {
			return res.status(400).send({ message: 'Error al eliminar docente ' + String(err) });
		}
		if (!user) {
			return res.status(500).send({ message: 'Usted no puede eliminar este docente' });
		} else {
			return res.status(200).send({
				status: "success",
				message: 'Usuario eliminado con éxito..!!'
			});
		}
	});
}
//PUSHHHHHHHHHHHHHHHHHHHH
function pushAny(req, res) {
	var data = req.body
	console.log("Ingresando a push ...")
	//push
	User.updateOne(
		{
			'num': data.teacherNid
		},
		{
			$push: {
				"combos.$[combo].act.$[nact].results": {
					$each: [
						data.toPush
					]
				}
			}
		},
		{
			arrayFilters: [{ 'combo.code': data.comboCode }, { 'nact._id': data.actId }]
		},
		(err, results) => {
			if (err) {
				return res.status(500).send({ message: 'Error en la petición' });
			}

			if (!results) {
				return res.status(404).send({ message: 'No resuldo' });
			}
			return res.status(200).send({
				results: true
			});

		});
}
//ULTIMO DOCENTE
function userGetMax() {
	console.log("Ingresando a saveUserx ...")
	User.countDocuments({}, function (err, count) {
		console.log("Total: ", count);
	});
	console.log("---------------------------------");

}
//DEVOLVER UN LISTADO DE USUARIOS - PAGINADO
function getUsers(req, res) {
	var identify_user_id = req.user.sub;//recoger el id del docente logueado
	var page = 1;
	var buscar = req.params.buscar;

	if (req.params.page) {
		page = req.params.page;
	}

	var itemsPerPage = 20; //cantidad de docentes que se listaran por pagina


	User.find({ 'active': true, 'role': ['CLIENTE'] }).sort('lastname').paginate(page, itemsPerPage, (err, users, total) => {
		if (err) {
			return res.status(500).send({ message: 'Error en la petición' });
		}

		if (!users) {
			return res.status(404).send({ message: 'No hay docente disponibles' });
		}

		return res.status(200).send({
			users,
			total,
			pages: Math.ceil(total / itemsPerPage)
		});

	});
}
//DEVOLVER UN LISTADO DE USUARIOS DE ACUERDO A LA BUSQUEDA
function searchUsers(req, res) {
	var identify_user_id = req.user.sub;//recoger el id del docente logueado
	var page = 1;
	var search = req.params.search;
	console.log(search)
	if (req.params.page) {
		page = req.params.page;
	}

	var itemsPerPage = 6; //cantidad de docentes que se listaran por pagina

	//User.find({'active': true, $or: [ { 'name': /.*buscar.*/ }, { 'username': /.*buscar.*/  } ]}).sort('_id').paginate(page, itemsPerPage, (err, users, total) => {
	User.find({ 'active': true, $or: [{ 'name': new RegExp(search, 'i') }, { 'username': new RegExp(search, 'i') }] }).sort('_id').paginate(page, itemsPerPage, (err, users, total) => {
		if (err) {
			return res.status(500).send({ message: 'Error en la petición' });
		}
		console.log(users)

		if (!users) {
			return res.status(404).send({ message: 'No hay docente disponibles' });
		}

		return res.status(200).send({
			users,
			total,
			pages: Math.ceil(total / itemsPerPage)
		});

	});
}
//Subir archivos de imagen/avatar de docente
function uploadImage(req, res) {
	var userId = req.params.id;

	if (req.files) { //si enviamos algun fichero
		// image corresponde al elemento del html
		var file_path = req.files.image.path; //path de la imagen que se quiere subir
		//console.log(file_path);

		var file_split = file_path.split('\\'); //cortar del path el nombre del archivo
		//console.log(file_split);

		var file_name = file_split[2]; //extrayendo el nombre de la imagen
		//console.log(file_name);

		var ext_split = file_name.split('\.');
		//console.log(ext_split);

		var file_ext = ext_split[1]; //obtener la extension del archivo
		//console.log(file_ext);

		if (userId != req.user.sub) { //el propio docente podrá subir imagenes
			//colocar return para evitar problemas con la cabecera
			return removeFilesUploads(res, file_path, 'No tienes permiso para actualizar los datos');
		}

		if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
			//actualizar documentos de docente	
			//new: true para que tras la actualización muestre el docente con los datos actualizados
			//new:false para que tras la actualización muestre el docente con los datos anteriores
			User.findByIdAndUpdate(userId, { image: file_name }, { new: true }, (err, userUpdated) => {
				if (err) {
					return res.status(500).send({ message: 'Error en la petición' });
				}

				if (!userUpdated) {
					return res.status(404).send({ message: 'No se ha podido actualizar' });
				}
				return res.status(200).send({ user: userUpdated });
			});
		} else {
			//colocar return para evitar problemas con la cabecera
			return removeFilesUploads(res, file_path, 'Extensión no válida');
		}
	} else {
		return res.status(200).send({ message: 'No se han subido imagenes' });
	}
}
function removeFilesUploads(res, file_path, message) {
	fs.unlink(file_path, (err) => { //callback
		return res.status(200).send({ message: message });
	});
}
//obtener la imagen
function getImageFile(req, res) {
	var image_file = req.params.imageFile; //imageFile será un campo del formulario
	var path_file = "./uploads/users/" + image_file;

	fs.exists(path_file, (exists) => {
		if (exists) {
			res.sendFile(path.resolve(path_file));
		} else {
			res.status(200).send({ message: 'No existe la imagen ...' });
		}
	});
}
function sendEmailVerification(email, hostname) {
	console.log('okokkk');
	console.log(hostname);
	console.log(email);

	rand = Math.floor((Math.random() * 100) + 54);
	host = hostname.split(':');
	console.log(host[0]);
	link = 'http://' + host[0] + ':4200/';

	link = link + "verify?id=" + rand;
	email_docente = email;
	mailOptions = {
		to: email,
		subject: "Por favor confirme su cuenta de correo electrónico",
		//html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"	
		html: "<h3> Haga clic en el enlace para verificar su correo electrónico. <br> <a href=" + link + "> Haga clic aquí para verificar </h3>"
	}

	console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function (error, response) {
		if (error) {
			console.log('ocurre eeeee un error');
			console.log('ocurre un error');
			console.log(error);
		} else {
			console.log(message)
			console.log("Message sent: " + response.message);
		}
	});

	console.log('whats up');

}
function verificationEmail(req, res) {
	//console.log(req.query.id);
	//console.log('');
	//console.log(email_docente);
	//console.log('');

	//console.log(req.protocol+":/"+req.get('host'));
	//if((req.protocol+"://"+req.get('host'))==("http://"+host)){
	//console.log("Domain is matched. Information is from Authentic email");
	if (req.query.id == rand) {
		//console.log("email is verified");

		User.find({ email: email_docente.toLowerCase() }).exec((err, users) => {
			if (err) {
				return res.status(500).send({
					message: 'Error en la petición de docente ' + String(err)
				});
			}

			if (users && users.length >= 1) {
				/*console.log('')
				console.log(users[0]._id)
				console.log('')*/
				User.findByIdAndUpdate(users[0]._id, { $set: { active: true } }, { new: true }, (err, userUpdated) => {
					if (err) {
						return res.status(500).send({ message: 'Error en la petición' });
					}
					if (!userUpdated) {
						return res.status(404).send({ message: 'No se ha podido actualizar el docente' });
					}
					return res.status(200).send({ user: userUpdated });
				});
			}
		});
	}
	else {
		console.log("email is not verified");
		return res.status(404).send({ message: 'email is not verified' });
		//res.end("<h1>Bad Request</h1>");
	}
}
//RECUPERAR CUENTA
function sendEmailRecuperarCuenta(req, res) {
	var params = req.body;
	var email = params.email;
	var hostname = req.get('host')

	rand = Math.floor((Math.random() * 100) + 54);
	host = hostname.split(':');
	link = 'http://' + host[0] + ':4200/';

	console.log(params)
	console.log(email)
	console.log(hostname)


	link = link + "restablecer_cuenta?id=" + rand;
	console.log(link)
	//email_docente = email;
	mailOptions = {
		to: email,
		subject: "Restrablecer contraseña",
		html: "<h3> Haga clic en el enlace para restablecer su contraseña. <br> <a href=" + link + "> Haga clic aquí </h3>"
	}
	smtpTransport.sendMail(mailOptions, function (error, response) {
		if (error) {
			console.log('ocurre un error sendEmailRecuperarCuenta');
			console.log(error);
			return res.status(500).send({ message: 'Error en la petición sendEmailRecuperarCuenta' });
		} else {
			//console.log(message)
			//console.log("Message sent: " + response);
			return res.status(200).send({ ok: 'mensaje enviado' });
		}
	});
}
function restablecerCuenta(req, res) {
	var params = req.body;
	var email = params.email;
	var password;

	console.log(req.query.id)

	if (req.query.id == rand) {
		User.find({ email: email }).exec((err, users) => {
			if (err) {
				return res.status(500).send({
					message: 'Error en la petición de recuperarCuenta .. ' + String(err)
				});
			}

			//console.log(users)
			//console.log(users.email)

			if (users && users.length >= 1) {

				//encriptar password
				bcrypt.hash(params.password, null, null, (err, hash) => {
					password = hash;

					User.findByIdAndUpdate(users[0]._id, { $set: { password: password } }, { new: true }, (err, userUpdated) => {
						if (err) {
							return res.status(500).send({ message: 'Error en la petición recuperarCuenta ...' });
						}
						if (!userUpdated) {
							return res.status(404).send({ message: 'No se ha podido restablecer la cuenta' });
						}
						return res.status(200).send({ user: userUpdated });
					});
				});
			}
		});
	}
	else {
		console.log("email is not verified");
		return res.status(200).send({ message: 'email is not verified' });
		//res.end("<h1>Bad Request</h1>");
	}
}
//Actualizar clave
function changePassword(req, res) {
	var old_password = req.params.old_password;
	var new_password = req.params.new_password;
	var userId = req.params.id;

	console.log(old_password)
	console.log(new_password)
	console.log(userId)

	User.findOne({ _id: userId, active: true }, (err, user) => {
		if (err) {
			return res.status(500).send({ message: "Error en la petición" });
		}

		if (user) {
			//old_password no está encriptada
			//user.password está encriptada
			//para comparar la contraseña usar bcrypt.compare ya que compara una password encriptada (de la BD) y otra sin encriptar (que viene desde el formulario)
			bcrypt.compare(old_password, user.password, (err, check) => {
				if (check) {
					/*if (params.gettoken) {
						//generar y devolver token
						return res.status(200).send({
							token: jwt.createToken(user)
						});
	
					}else{
						//devolver datos de docente
						user.password = undefined; //no mostrar el password
						return res.status(200).send({user});					
					}*/

					//encriptar password
					bcrypt.hash(new_password, null, null, (err, hash) => {
						user.password = hash;

						//guardar docente
						user.save((err, userStored) => {
							if (err) {
								return res.status(500).send({
									message: 'Error al guardar el docente ' + String(err)
								});
							}

							if (userStored) {
								sendEmailVerification(user.email, req.get('host'));
								res.status(200).send({
									user: userStored
								});
							} else {
								res.status(404).send({
									message: 'No se ha registrado el docente'
								});
							}
						});
					});
				} else {
					return res.status(404).send({ message: "El docente no se ha podido identificar" });
				}
			});
		} else {
			return res.status(404).send({ message: "El docente no se ha podido identificar!!!" });
		}
	});
}
module.exports = {
	home,
	pruebas,
	loginUser,
	createUser,
	activateUser,
	readUser,
	updateUser,
	deleteUser,
	saveRequest,
	pushAny,
	getUsers,
	searchUsers,
	uploadImage,
	getImageFile,
	sendEmailVerification,
	verificationEmail,
	sendEmailRecuperarCuenta,
	restablecerCuenta,
	changePassword,
	userGetMax
}