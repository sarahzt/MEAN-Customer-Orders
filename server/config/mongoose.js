var mongoose = require('mongoose');
var fs = require('fs');
var dbName = 'mean_customer_orders';

var connect = function () {
    var options = { server:{socketOptions:{keepAlive:1}}};
    mongoose.connect('mongodb://localhost/'+dbName, options);
}
connect();

mongoose.connection.on('error', function (err) {
    console.log("Mongoose error!", err);
});

//reconnect
mongoose.connection.on('disconnected', function () {
    connect();
});

var models_path = __dirname + '/../models';
fs.readdirSync(models_path).forEach(function (file) {
    if(~file.indexOf('.js'))
    {
        require(models_path + '/' + file);
    }
});
