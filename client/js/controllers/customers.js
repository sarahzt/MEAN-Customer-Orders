// CLIENT CONTROLLER

// call customersApp.controller() method
customersApp.controller('customersController',function($scope,customerFactory){  
	// initialize an empty array so $scope.customers maintains a consistent data type 
	$scope.customers = [];

	customerFactory.getCustomers(function(data){
		$scope.customers = data;
	})

	// pass customer to factory deleteCustomer() function
	$scope.deleteCustomer = function(customer){
       customerFactory.deleteCustomer(customer, function(data){
       		console.log('deleted data in view controller',data);       		
            // remove this customer from customers array that user sees (not reloading db data)            
            $scope.customers.splice($scope.customers.indexOf(data),1);
       });
	}

    $scope.addCustomer = function(newCustomer){           
    	// run addCustomer() function and define a callback - what to do with the data;                             
        customerFactory.addCustomer(newCustomer,function(data){
        	console.log('new data in view controller',data);
        	// add returned object(record) to customers scope
        	$scope.customers.push(data);
        });   
    }			

	$scope.validateCustomer = function(newCustomer){
		var duplicateCustomer = 0;

		console.log('disabled?',$scope.isDisabled);

		// loop through array of customer objects
		for (var i=0; i<$scope.customers.length; i++)
		{
			console.log('name:',$scope.customers[i].name);

			if ($scope.newCustomer.name == $scope.customers[i].name)
			{    						
				duplicateCustomer = 1;
				console.log('is duplicate?' + duplicateCustomer);
			}
		}

		if(!duplicateCustomer)
		{
			// enable submit button  
			$scope.add.$invalid = false;	
		}  
		else
		{
			// disable submit button
			$scope.add.$invalid = true;
		} 

		return $scope.isDisabled;
	}
})