//DEFINICION DEL MODELO USUARIO

//utilizar nuevas características de javascript
'use strict'
//cargar la libreria de mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const visitSchema = new Schema({
  ip: String,
  date: String,
  device: String
}, {
  toJSON: {
    virtuals: true,
  },
});

//para poder utilizar el modelo fuera de este fichero
//en la base de datos se buscara la colección users ya que se User se pondrá en minuscula y se agregará la letra s
module.exports = mongoose.model('Visit', visitSchema);

