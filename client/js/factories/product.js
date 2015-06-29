customersApp.factory('productFactory', function($http){
    // controller calls upon this factory - factory gets data from the server-side
    var products = [];  
    var factory = {};

    // manual data for view layout
 //    var products = [
	// 	{name:'Nike Shoes',_id:1,image:'',inventory:'',description:'',created_date:new Date()},
	// 	{name:'Black Belts',_id:2,image:'',inventory:'',description:'',created_date:new Date()},
	// 	{name:'Ice Cream',_id:3,image:'',inventory:'',description:'',created_date:new Date()},
	// 	{name:'Candies',_id:4,image:'',inventory:'',description:'',created_date:new Date()}
	// ]	

	// return the object we defined
	factory.getProducts = function(callback){
		// pass data to a callback to be used by whoever calls method
		// (callback is for passing data from factory to controller)
		$http.get('/products/show').success(function(output){
			console.log('products',output);
			callback(output);
		})		
	};

	// set addProduct equal to a function (so can be called by controller) which receives a callback
	factory.addProduct = function(newProduct,callback){
		$http.post('/products/add',newProduct).success(function(output){
			console.log('added product', output);
			callback(output);
		})
	};

	factory.showProduct = function(id,callback){
		$http.get('/products/show/'+id).success(function(output){
			console.log('show one in view factory', output);
			callback(output);
		})
	};

	// set editProduct equal to a function (so can be called by controller) which receives a callback
	factory.editProduct = function(product,callback){
		$http.post('/products/edit',product).success(function(output){
			console.log('edited product', output);
			callback(output);
		})
	};

	factory.deleteProduct = function(id,callback){
		console.log('delete in factory:',id);
		$http.post('/products/delete/',id).success(function(output){
			console.log('deleted product', output);
			callback(output);
		});
	}

	// factory.deleteCustomer = function(customer,callback){
 //        // remove this customer (by value) from customers array
 //        // customers.splice(customers.indexOf(customer),1);
 //        $http.post('/customers/delete',customer).success(function(output){
 //            console.log('deleted data in factory:', output);
 //            callback(output);
 //        });
 //    };
  
    // return the object so it can be used
    return factory;
})