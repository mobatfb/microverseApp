//DEFINICION DEL MODELO USUARIO

//utilizar nuevas características de javascript
'use strict'

//cargar la libreria de mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//esquema para empresa 
const BusinessSchema = new Schema({
  ownerid: String,
  name: String,
  slogan: String,
	summary: String,
	category: String,
  country:String,
  city: String,
  zone: String,
	address: String,
	mision: String,
	vision: String,
  email: String,
	phone: String,
  image: String,
  banner: String,
  datecreated: String,
  enable: Boolean,
  socials: [
  ],
  services: [

  ],
}, {
  toJSON: {
    virtuals: true,
  },
});

//para poder utilizar el modelo fuera de este fichero
//en la base de datos se buscara la colección users ya que se User se pondrá en minuscula y se agregará la letra s
module.exports = mongoose.model('Business', BusinessSchema); 

