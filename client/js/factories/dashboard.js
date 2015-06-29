// CLIENT FACTORY

// call customersApp.factory() method - pass in $http so we can get/post
// (fyi: we only really need a factory if we're working with a db...)
customersApp.factory('dashboardFactory', function($http){
	// controller calls upon this factory - factory gets data from the server-side
	var factory = {};
    

	// return the object so it can be used
	return factory;
})
