//DEFINICION DEL MODELO USUARIO

//utilizar nuevas características de javascript
'use strict'
//cargar la libreria de mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  lastname: String,
  username: String,
  email: String,
  cname: String,
  cemail: String,
  cphone:String,
  occupation:String,
  password:String,
  businessid:String,
  address:String,
  image:String,
  banner:String,
  country:String,
  city: String,
  zone: String,
  datebirth:String,
  datecreated: String,
  valid:Boolean,
  request: [{
    date: String,
    idservice: String,
  }],
}, {
  toJSON: {
    virtuals: true,
  },
});

//para poder utilizar el modelo fuera de este fichero
//en la base de datos se buscara la colección users ya que se User se pondrá en minuscula y se agregará la letra s
module.exports = mongoose.model('User', userSchema);

