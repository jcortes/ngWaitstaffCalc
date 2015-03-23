angular.module('waitCalc', ['ngMessages', 'ngRoute', 'ngAnimate'])

.run(function($rootScope, $location, $timeout){
    $rootScope.$on('$routeChangeError', function(){
        $location.path('/error');
    });
    $rootScope.$on('$routeChangeStart', function(){
        
    });
    $rootScope.$on('$routeChangeSuccess', function(){
        $timeout(function() {
            
        }, 1000);
    });
})

.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'app/home.html',
        controller: 'HomeCtrl as hc'
    })
    .when('/new-meal', {
        templateUrl: 'app/new-meal.html',
        controller: 'NewMealCtrl as nmc'
    })
    .when('/my-earnings', {
        templateUrl: 'app/my-earnings.html',
        controller: 'MyEarningsCtrl as mec'
    })
    .when('/error', {
        template: '<div class="container text-center">\
                        <p>Error - Page Not Found</p>\
                    </div>'
    })
    .otherwise('/error');
})

.service('srvData', function(){
    var srvData = this;
    var tip_count = 0;
    var meal_count = 0;
    reset();
    
    function clear(){
        // Meal Detailes fields
        srvData.base_meal_price = null;
        srvData.tax_rate = null;
        srvData.tip_perc = null;
        // Default Customer Charges
        srvData.subtotal = 0;
        srvData.tip = 0;
    }
    
    function reset(){
        clear();
        // Default Earnings Info
        srvData.tiptotal_count = 0;
        srvData.meal_count = 0;
        srvData.average_count = 0;
        tip_count = 0;
        meal_count = 0;
    }
    
    function calc(){
        var bmp = srvData.base_meal_price;
        var tr = srvData.tax_rate;
        var t = srvData.tip_perc;

        var tax = (bmp * tr)/100;
        var subtotal = bmp + tax;
        var tip = (subtotal * t)/100;

        tip_count = tip_count + tip;
        meal_count = meal_count + 1;

        var average_count = tip_count / meal_count;

        srvData.subtotal = subtotal;
        srvData.tip = tip;
        srvData.tiptotal_count = tip_count;
        srvData.meal_count = meal_count;
        srvData.average_count = average_count;
    }
    
    function get(){
        return srvData;
    }
    
    return {
        clear: clear,
        reset: reset,
        calc: calc,
        get: get
    };
})

.controller('HomeCtrl', ['$scope', function($scope){}])

.controller('NewMealCtrl', ['$scope', 'srvData', function($scope, srvData){
    var vm = this;
    vm.data = srvData.get();
    vm.submit = function(){
        if($scope.frm.$valid){
            srvData.calc();
            vm.data = srvData.get();
        }
    };
    vm.clear = function(){
        $scope.frm.$submitted = false;
        srvData.clear();
        vm.data = srvData.get();
    };
}])

.controller('MyEarningsCtrl', ['$scope', 'srvData', function($scope, srvData){
    var vm = this;
    vm.data = srvData.get();
    vm.reset = function(){
        srvData.reset();
        vm.data = srvData.get();
    };
}]);