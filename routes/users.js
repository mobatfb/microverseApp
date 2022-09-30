//DEFINICION DE RUTAS USUARIO

//utilizar nuevas características de javascript
'use strict'

var express = require('express');
var UserController = require('../controllers/users');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();

//middleware para subir archivos
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'}); //aqui se guardarán las imagenes que usa el usuario

api.get('/home', UserController.home);
api.get('/pruebas', md_auth.ensureAuth , UserController.pruebas);

api.post('/loginuser', UserController.loginUser);
api.put('/pushresult', UserController.pushAny);

api.post('/createuser', UserController.createUser);
api.get('/readuser/:name', UserController.readUser);
api.get('/updateuser/:name', UserController.updateUser);
api.post('/getuser', UserController.getUser);
api.post('/savesignal', UserController.saveSignal);
api.post('/getsignal', UserController.getSignal);
api.post('/getusersactive', UserController.getUsers);

api.delete('/deleteuser/:id', UserController.deleteUser); 

api.get('/usergetMax', UserController.userGetMax);
api.post('/request', UserController.saveRequest);
api.post('/verify', UserController.sendEmailVerification);
//api.post('/sendmail', UserController.sendMail);
api.post('/recuperar_cuenta', UserController.sendEmailRecuperarCuenta);
api.post('/restablecer_cuenta', UserController.restablecerCuenta);
api.post('/cambiar_clave/:id/:old_password/:new_password', UserController.changePassword);

//api.post('/send-email-to-verification', UserController.sendEmailVerification);
api.get('/verification-of-email', UserController.verificationEmail);
api.get('/users/:page?', md_auth.ensureAuth , UserController.getUsers);
api.get('/users-search/:search/:page?', md_auth.ensureAuth , UserController.searchUsers);
api.put('/actualiza-usuario/:id', UserController.updateUser); 
api.post('/update-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);


module.exports = api; //exportar todas las rutas