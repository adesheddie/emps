var express = require('express');
var app = express();
var bodyparser=require('body-parser');
var fileRoutes = require("./server/routes/file-upload");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
var mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost/emp');
mongoose.connect('mongodb://adesheddie:gaming619*@ds243717.mlab.com:43717/emp')
app.use('/images',fileRoutes);
app.use('/', function (req, res) {


    res.send("Node Running Here");
});
// var userroutes=require('./server/routes/image-upload');
app.listen(process.env.PORT || 8080);


console.log("Node is Running");
