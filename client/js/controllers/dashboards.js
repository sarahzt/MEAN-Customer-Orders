// CLIENT CONTROLLER

// call customersApp.controller() method
customersApp.controller('dashboardController',function($scope,customerFactory,orderFactory,productFactory){  
	// initialize an empty array so $scope.customers maintains a consistent data type 
	$scope.customers = [];
	$scope.products = [];
	$scope.orders = [];

	customerFactory.getCustomers(function(data){
		$scope.customers = data;
	})

	productFactory.getProducts(function(data){
		$scope.products = data;
	})

	orderFactory.getOrders(function(data){
		$scope.orders = data;
	})
})