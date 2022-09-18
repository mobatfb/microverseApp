//utilizar nuevas características de javascript
'use strict'
var date = Date.now();
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var User = require('../models/users'); // cargar modelo de usuario
var Business = require('../models/business')
var mongoose = require('mongoose')
var fs = require('fs'); //libreria file sistem de node
var path = require('path'); //permite trabajar con rutas de sistemas de ficheros
const { bus } = require('nodemon/lib/utils');
//REGISTRAR NEGOCIO
function createBusiness(req, res) {
    var params = req.body;
    _validIdOwner()
    function _validIdOwner() {
        User.findOne(
                { _id: params.ownerid },
        ).exec((err, users) => {
            if (err) {
                return res.status(200).send({
                    status: 'error',
                    message: 'Error inesperado code: (x0000x0)'
                });
            }
            if (users) {
                _validDouble()
            } else {
                return res.status(200).send({
                    status: 'error',
                    message: 'Error inesperado code: (x0000x1)'
                });
            }
        })
    }
    function _validDouble() {
        Business.findOne(
                { name: params.name.toLowerCase() },
        ).exec((err, business) => {
            if (err) {
                return res.status(200).send({
                    status: 'error',
                    message: 'Error en la petición de registro ' + String(err)
                });
            }
            if (business) {
                return res.status(200).send({
                    status: 'warning',
                    message: 'Su nombre de negocio ya se encuentra registrado'
                });
            } else {
                _validData()
            }
        })
    }
    function _validData() {
        if (!(params.name && params.category && params.country && params.zone && params.city && params.summary)) {
            return res.status(200).send({
                status: "warning",
                message: 'Envía todos los campos'
            })
        } else {
            _setObjetc()
        }
    }
    function _setObjetc() {
        var business = new Business();
        business.ownerid = params.ownerid
        business.name = params.name.toLowerCase()
        business.category = params.category
        business.country = params.country
        business.zone = params.zone
        business.city = params.city
        business.summary = params.summary
        business.slogan = "Dedicados al brindar servicios de " + params.category + "."
        business.mision = "Poner a tu disposicion los mejores servicios de " + params.category + "."
        business.vision = "Brindar nuestros servicios a nivel nacional."
        business.manager = "Sin encargado"
        business.address = "Sin dirección"
        business.email = ""
        business.image = ""
        business.banner = ""
        const hoy = new Date(date)
        business.datecreated = hoy
        business.phone = ""
        business.socials=[
            { name: 'Facebook', icon: 'mdi-facebook', link: "" },
            { name: 'Twitter', icon: 'mdi-twitter', link: "" },
            { name: 'Linkedin', icon: 'mdi-linkedin', link: ""},
            { name: 'Instagram', icon: 'mdi-instagram', link: "" },
            { name: 'Sitio Web', icon: 'mdi-web', link: "" },    
            { name: 'Catalogo', icon: 'mdi-shopping', link: "" }
        ]
        business.enable = true
        business.services = [
        ]
        _save(business)
    }
    function _save(business) {
        business.save((err, business) => {
            if (err) {
                return res.status(200).send({ status: "error", message: 'Error en la petición' });
            }
            else if (!business) {
                return res.status(200).send({ status: "error", message: 'No se ha podido registrar la sesión' });
            }
            else {
                return res.status(200).send({
                    status: "success",
                    business: {name:business.name, id:business._id,image:business.image, banner:business.banner},
                    message: 'Negocio '+business.name+' registrado con exito.'
                })
            }
        })
    }
}
//CONSEGUIR DATA DEL NEGOCIO
function readBusiness(req, res) {
    var aux=req.params.aux.split("@")
	Business.findOne(aux[1]=="id"? {_id:aux[0]}:{name:aux[0].toLowerCase()} , (err, business) => {
        if (err) {
			return res.status(200).send({status:"error", message:'Error en la petición'});			
		}
		if (business) {
			return res.status(200).send(aux[1]=="id"?{businessname: business.name}:aux[1]!="valid"?{business: business}:true);
		}else{
			return res.status(200).send({status:"warning", message: 'No encontrado el negocio'});
        }
	});
}
//Edición de datos de usuario
function updateBusiness(req, res) {
    var businessname = req.params.name;
    var userId = req.user.sub;
    var update_text = req.body;

    if (userId != req.user.sub) {
        return res.status(500).send({ message: 'No tienes permiso para actualizar este registro' });
    }

    if (update_text.slogan && update_text.mision && update_text.vision && update_text.manager && update_text.address && update_text.phone) {

        var phone = update_text.phone

        var isNumberAct = isNaN(phone)
        console.log(isNumberAct)
        if (isNumberAct == true) {
            console.log('Validacion realizada!!')
            return res.status(406).send({
                status: "error",
                message: "Datos no validos, solo se aceptan números en el campo numero de acta!!"
            })
        }

        else if (isNumberAct == false) {


            Business.findByIdAndUpdate(businessId, {
                $set: {
                    slogan: update_text.slogan,
                    mision: update_text.mision,
                    summary: update_text.summary,
                    vision: update_text.vision,
                    manager: update_text.manager,
                    address: update_text.address,
                    phone: update_text.phone,
                    summary: update_text.summary,
                    values: {
                        text: update_text.values.text,
                        optvalues: update_text.values.optvalues
                    },
                    socials: {
                        facebook: update_text.socials.facebook,
                        instagram: update_text.socials.instagram,
                        whatsapp: update_text.socials.whatsapp,
                        catalogue: update_text.socials.catalogue,
                    },
                }
            }, { new: true }, (err, businessUpdated) => {
                if (err) {
                    return res.status(500).send({ message: 'Error en la petición de actualizar empresa' });
                }
                if (!businessUpdated) {
                    return res.status(404).send({ message: 'No se ha podido actualizar datos de la empresa' });
                }
                return res.status(200).send({
                    status: 'success',
                    business: businessUpdated,
                    message: "Informacion Institucional actualizada con éxito..!!"
                });
            });

        }
    } else {
        return res.status(404).send({
            status: 'error',
            message: "Envía todos los campos!!"
        });
    }




}
//Eliminar Sesión
function deleteBusiness(req, res) {
    var sesionId = req.params.id

    Session.findOneAndDelete({ _id: sesionId }, (err, session) => {
        if (err) {
            return res.status(400).send({ message: 'Error al eliminar la sesión ' + String(err) });
        }
        if (!session) {
            return res.status(500).send({ message: 'Usted no puede eliminar esta moción' });
        } else {
            return res.status(200).send({
                status: "success",
                message: 'La sesión se ha eliminado con éxito..!!'
            });
        }
    });
}


module.exports = {
    createBusiness,
    readBusiness,
    updateBusiness,
    deleteBusiness,
}