var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userschema = new Schema({
    name: String,
    age: String,
    designation: String,
    doj: String,
    about:String,
    img:String,
    designation:String

}, { versionKey: false });

module.exports = mongoose.model('employees', userschema);