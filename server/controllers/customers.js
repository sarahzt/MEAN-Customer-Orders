// SERVER CONTROLLER

// require mongoose
var mongoose = require('mongoose');

// require customer model
var Customer = mongoose.model('Customer');

// set database functions (runs as immediate function)
module.exports = (function(){
	return {
		show: function(request,response){
			console.log(request.body);
			// run find all query, then execute anonymous call back function
			// (callback let's server controller know that its job is done, so it can callback its caller)
			Customer.find({}, function(error,results){
				if(error) {
					console.log('database error occurred',error);
				}
				else {
					// log db results
					console.log('show all in server controller',results);
					// send back database data as json
					response.json(results);
				}
			})
		},
		add: function(request,response){
			console.log('customers server controller',request.body.name);
			var newCustomer = new Customer({name:request.body.name,created_at:request.body.created_at});
			// run save query then execute anonymous call back function
			newCustomer.save(function(error){
				if(error){
					console.log('database error occurred during insert',error);
					response.json('error');
				}
				else{
					console.log('added  in server controller',newCustomer);
					response.json(newCustomer);
				}
			})
		},
		delete: function(request,response){ 
			Customer.findByIdAndRemove(request.body._id, function(error,results){
				if(error){
					console.log('database error occurred during delete',error);
					response.json('error');
				}
				else {
					console.log('deleted in server controller:',results);
					response.json(results);
				}
			})
		}
	}
})();