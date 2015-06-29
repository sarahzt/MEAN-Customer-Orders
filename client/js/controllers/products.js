// call customersApp.controller() method
customersApp.controller('productsController', function($scope,productFactory){ 
     $scope.newProduct = {}

    $scope.addFileName = function(files) {
        // haven't gotten a real file upload working yet in angular...
        // in the meantime, at least save filenames to the database
        // console.log("select a file",files[0].name);

        // save filename submitted to newProduct object
        $scope.newProduct.image = files[0].name;
     }

    // initialize an empty array so $scope.customers maintains a consistent data type 
    $scope.products = [];

    productFactory.getProducts(function(data){
    	$scope.products = data;
    })

    // make addProduct equal to a function and add to scope so it can be called by view
    $scope.addProduct = function(newProduct){
        console.log(newProduct);
    	// if product has a key, then edit; else add
    	if('_id' in newProduct)
    	{
    		console.log('existing product:',newProduct);

    		// call factory method, passing in object to add
	    	productFactory.editProduct(newProduct,function(data){
	    		// when method is finished aading, anonymous callback saves received data to scope variable
	    		console.log('edited product',data);
	    		$scope.newProduct = [];
	    		// (to fix: after running this function, even though the form is cleared out, adding a new product results in a blank db record.)
	    		// how to update this product in products scope?
	    		// $scope.findObjectByProperty($scope.products,data._id)	    		 
			});
			// run getProducts() again to display updated data
			 productFactory.getProducts(function(data){
		    	$scope.products = data;
		    	console.log($scope.products);
		    });
    	}
    	else
    	{
    		// call factory method, passing in object to add
    		productFactory.addProduct(newProduct,function(data){
	    		// when method is finished aading, anonymous callback saves received data to scope variable
	    		$scope.products.push(data);
    		})    	
    	}    	
    }

    $scope.showProduct = function(product){
    	console.log('show product:',product._id);
    	// overwrite form inputs with data to edit
    	// (because the factory will perform a get request, its ok for id to be a string; for posts, it needs to be a json object {id:product._id})
    	var id = product._id;
    	productFactory.showProduct(id, function(data){
    		$scope.newProduct = data;
    		console.log('show one in view controller:',$scope.newProduct);
    	})
    }

    $scope.editProduct = function(product){
    	console.log('edit product:',product);
    	// overwrite form inputs with data to edit
    	productFactory.editProduct(product, function(data){
    		$scope.newProduct = data;
    	});
    }

    $scope.deleteProduct = function(product){
    	console.log('delete product:',product._id);
    	// have to pass this variable as json or will get 400 http error
    	var id = {id:product._id};
    	// overwrite form inputs with data to edit
    	productFactory.deleteProduct(id, function(data){
    		console.log(data);
    	});
    	// get fresh data
    	productFactory.getProducts(function(data){
	    	$scope.products = data;
	    	console.log($scope.products);
	    });
    }

    $scope.clearFormValues = function(){
    	$scope.newProduct = [];
    }

    // $scope.findObjectByProperty = function(arr,property)
    // {
    // 	for (var i=0, i< arr.length; i++) {
		  //   var object = arr[i];

		  //   for (var property in object) {
		  //     if (object.hasOwnProperty(property) && object[property] == value) {
		  //       return object;
		  //     }
		  //   }
		  // }
    // }

})