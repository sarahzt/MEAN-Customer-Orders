// require mongoose config
var config_mongoose = require('./server/config/mongoose');

// require express module
var express = require('express');

// require path module
var path = require('path');

// create express app
var app = express();

// require body-parser
var bodyParser = require('body-parser');

// use body parser (this is newest syntax for instantiation)
app.use(bodyParser.json()); 

// set path to static folder
app.use(express.static(path.join(__dirname,'./client')));

// haven't gotten angular file uploads working "angular is not defined" - references are spotty
// var angularFileUpload = require('angular-file-upload');
// var multipartform = require('./server/config/multipart');

// require routes config and run
require('./server/config/routes')(app);

// tell express app to listen on port 8000
var server = app.listen(8000,function() {
	console.log("listening on port 8000");
});