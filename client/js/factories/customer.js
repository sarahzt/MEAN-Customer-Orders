// CLIENT FACTORY

// call customersApp.factory() method - pass in $http so we can get/post
// (fyi: we only really need a factory if we're working with a db...)
customersApp.factory('customerFactory', function($http){
	// controller calls upon this factory - factory gets data from the server-side
	var factory = {};
    var customers = [];

	// return the object we defined
	factory.getCustomers = function(callback){
		// pass data to a callback to be used by whoever calls method
		// (callback is for passing data from factory to controller)
        $http.get('/customers/show').success(function(output){
            // set customers to db output
            console.log(output);
            customers = output;
            // on success, run callback function, returning data
            callback(customers);
        })		
	};

    factory.addCustomer = function(newCustomer,callback){                                        
        // add created_date to newCustomer object (customer:[customer name])
        // (need to pretty this date up)
        newCustomer.created_at = new Date();    

        console.log('in customerFactory',newCustomer);

        $http.post('/customers/add',newCustomer).success(function(output){
            console.log('added data in factory');
            console.log(output);
            callback(output);
        });
    
        // empty form field
        newCustomer = [];    
    };

    // return method data from factory
    factory.deleteCustomer = function(customer,callback){
        // remove this customer (by value) from customers array
        // customers.splice(customers.indexOf(customer),1);
        $http.post('/customers/delete',customer).success(function(output){
            console.log('deleted data in factory:', output);
            callback(output);
        });
    };

	// return the object so it can be used
	return factory;
})
