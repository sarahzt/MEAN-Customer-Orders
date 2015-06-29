customersApp.factory('orderFactory', function($http){
    // controller calls upon this factory - factory gets data from the server-side
    var orders = [];  
    var factory = {};

    // return the object we defined
    factory.getOrders = function(callback){
        // pass data to a callback to be used by whoever calls method
        // (callback is for passing data from factory to controller)
        $http.get('/orders/show').success(function(output){
            callback(output);
        })
    }

    factory.addOrder = function(newOrder,callback) {
        newOrder.created_at = new Date();

        $http.post('/orders/add',newOrder).success(function(output){
            console.log('new order added in client factory',output);
            console.log(output);
            callback(output);
        })
    }

    factory.deleteOrder = function(order,callback){
        $http.post('/orders/delete',order).success(function(output){
            console.log(output);
            callback(output);
        })
    }

    // return the object so it can be used
    return factory;
})