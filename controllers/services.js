//utilizar nuevas características de javascript
'use strict'
var date = Date.now();
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var Service = require('../models/services'); // cargar modelo de usuario
var Business = require('../models/business'); // cargar modelo de usuario
var mongoose = require('mongoose')
var fs = require('fs'); //libreria file sistem de node
var path = require('path'); //permite trabajar con rutas de sistemas de ficheros
const { bus } = require('nodemon/lib/utils');
//REGISTRAR SERVICIO
function createSevice(req, res) {
    var params = req.body;
    _validIdOwner()
    function _validIdOwner() {
        Business.findById(
            params.businessid
        ).exec((err, business) => {
            if (err) {
                return res.status(200).send({
                    status: 'error',
                    message: 'Error inesperado code: (x0000x0)'
                });
            }
            if (business) {
                _validData()
            } else {
                return res.status(200).send({
                    status: 'error',
                    message: 'Error inesperado code: (x0000x1)'
                });
            }
        })
    }
    function _validData() {
        if (!(params.businessid && params.name && params.category && params.type && params.info)) {
            return res.status(200).send({
                status: "warning",
                message: 'Envía todos los campos'
            })
        } else {
            _setObjetc()
        }
    }
    function _setObjetc() {
        var service = new Service();
        service.businessid = params.businessid
        service.name = params.name
        service.category = params.category
        service.type = params.type
        service.info = params.info
        service.image = params.image!=null?params.image : ""
        const hoy = new Date(date)
        service.datecreated = hoy
        service.enable = true
        _save(service)
    }
    function _save(service) {
        service.save((err, service) => {
            if (err) {
                return res.status(200).send({ status: "error", message: 'Error en la petición' });
            }
            else if (service) {
                _pushServiceBusiness(service.id, service.businessid, service.name)
            }
            else {
                return res.status(200).send({ status: "error", message: 'No se ha podido registrar la sesión' });
            }
        })
    }
    function _pushServiceBusiness(id, businessid, name) {
        Business.findByIdAndUpdate(
            businessid,
            {
                $push: {
                    "services": {
                        $each: [
                            id
                        ]
                    }
                }
            },
            (err, results) => {
                if (err) {
                    return res.status(500).send({ message: 'Error en la petición' });
                }
                if (results) {
                    return res.status(200).send({
                        status: "success",
                        service: { id, businessid },
                        message: 'Servicio ' + name + ' registrado con exito.'
                    })
                }
                return res.status(404).send({ message: 'No resuldo' });
            });
    }
}
//CONSEGUIR DATA DEL SERVICIO
function readService(req, res) {
    var serviceId = req.params.id
    Service.findById(serviceId, (err, service) => {
        if (err) {
            return res.status(200).send({ status: "error", message: 'Error en la petición', service: { id: serviceId, fail: true } });
        }
        if (service) {
            return res.status(200).send({ service: service });
        } else {
            return res.status(200).send({ status: "warning", message: 'No encontrado el servicio', service: { id: serviceId, fail: true } });
        }
    });
}
//Edición de datos de usuario
function updateService(req, res) {
    var serviceId = req.params.id;
    var params = req.body;
    _validData()
    function _validData() {
        if (!(params.businessid && params.name && params.category && params.type && params.info)) {
            return res.status(200).send({
                status: "warning",
                message: 'Envía todos los campos'
            })
        } else {
            _setObjetc()
        }
    }
    function _setObjetc() {
        var service = new Service();
        service.name = params.name
        service.category = params.category
        service.type = params.type
        service.info = params.info
        service.image = params.image
        _update(service)
    }
    function _update(service) {
        Service.findByIdAndUpdate(serviceId,  {
                name: service.name,
                category: service.category,
                type: service.type,
                info: service.info,
                image: service.image
            },
         (err, serviceUpdate) => {
            if (err) {
                return res.status(200).send({ status: 'error', message: 'Error en la petición de actualizar servicio' });
            }
            if (serviceUpdate) {
                return res.status(200).send({
                    status: 'success',
                    service: serviceUpdate,
                    message: "servicio actualizado con éxito..!!"
                });
            } else {
                return res.status(200).send({ status: 'error', message: 'No se ha podido actualizar el servicio' });
            }

        });
    }

}
//Eliminar Servicio
function deleteService(req, res) {
    var serviceId = req.params.id
    var businessId = req.body.businessid
    _deleteService()
    function _deleteService() {
        Service.findByIdAndDelete(serviceId, (err, service) => {
            if (err) {
                return res.status(200).send({ status: "error", message: 'Error al eliminar el servicio' });
            }
            if (service) {
                _deleteServiceid()
            } else {
                return res.status(200).send({ status: "error", message: 'Error al eliminar servicio' });
            }
        });
    }
    function _deleteServiceid() {
        Business.updateOne(
            { _id: businessId },
            { $pull: { 'services': serviceId } }
            , (err, complete) => {
                if (err) {
                    return res.status(200).send({ status: "error", message: 'Error al eliminar el servicio ' + String(err) });
                }
                if (complete) {
                    return res.status(200).send({ status: "success", complete: true, message: 'Servicio eliminado con exito' });
                } else {
                    return res.status(200).send({ status: "error", message: 'Error al eliminar servicio' });
                }
            });
    }
}


module.exports = {
    createSevice,
    readService,
    updateService,
    deleteService,
}