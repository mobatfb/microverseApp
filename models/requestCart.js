//DEFINICION DEL MODELO USUARIO

//utilizar nuevas características de javascript
'use strict'
//cargar la libreria de mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const registerCartSchema = new Schema({
  name: String,
  date: String,
  contact: String,
  total: String,
  completed: Boolean,
  request: [],
}, {
  toJSON: {
    virtuals: true,
  },
});

//para poder utilizar el modelo fuera de este fichero
//en la base de datos se buscara la colección users ya que se User se pondrá en minuscula y se agregará la letra s
module.exports = mongoose.model('RegisterCart', registerCartSchema);

