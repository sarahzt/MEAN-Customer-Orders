// call customersApp.controller() method
customersApp.controller('ordersController',function($scope,orderFactory,customerFactory,productFactory){ 
    // initialize an empty array so $scope.customers maintains a consistent data type 
    $scope.orders = [];
    $scope.customers = [];
    $scope.products = [];

    // get all orders
    orderFactory.getOrders(function(data){
        $scope.orders = data;
    })

    // get all customers (to output in select menu)
    customerFactory.getCustomers(function(data){
        $scope.customers = data;
    })

    productFactory.getProducts(function(data){
        $scope.products = data;
    })

    $scope.addOrder = function(newOrder){                                 
        orderFactory.addOrder(newOrder, function(data){
            // display new date to users
            console.log('new order added in client controller',data);
            $scope.orders.push(data);
            // if we want to update the quantity, need a product id to pass to this method
            // productFactory.updateProductQty(product_id, function(data){
            //     console.log('updated quantity');
            // }
        });
    }

    $scope.deleteOrder = function(order) {
        orderFactory.deleteOrder(order, function(data){
            console.log('order deleted in client controller',data);
            // $scope.orders.splice($scope.orders.indexOf(data),1);
            // get fresh data
            orderFactory.getOrders(function(data){
                $scope.orders = data;
                console.log("updated orders below");
                console.log($scope.orders);
            });
        });
    }
})