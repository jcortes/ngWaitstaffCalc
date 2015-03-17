angular.module('waitCalc', ['ngMessages'])

.controller('MainCtrl', function($scope){
    var vm = this;
    
    vm.reset = function(){        
        $scope.$broadcast('reset', {});
    };
})

.controller('DetailCtrl', function($scope, $rootScope){
    var vm = this;
    
    function defaultReset(withFrm){
        if(withFrm){
            $scope.frm.$submitted = false;
        }
        // Meal Detailes fields
        vm.base_meal_price = null;
        vm.tax_rate = null;
        vm.tip_perc = null;
    }
    
    defaultReset(false);
    var tip_count = 0;
    var meal_count = 0;
    
    vm.submit = function(){
        if($scope.frm.$valid){
            var bmp = vm.base_meal_price;
            var tr = vm.tax_rate;
            var t = vm.tip_perc;
            
            var tax = (bmp * tr)/100;
            var subtotal = bmp + tax;
            var tip = (subtotal * t)/100;
            
            tip_count = tip_count + tip;
            meal_count = meal_count + 1;
            
            var average_count = tip_count / meal_count;
            
            var data = {
                subtotal: subtotal,
                tip: tip,
                tiptotal_count: tip_count,
                meal_count: meal_count,
                average_count: average_count
            };
            
            $rootScope.$broadcast('submit', data);
        }
    };
    
    vm.clear = function(){
        defaultReset(true);
    };
    
    $scope.$on('reset', function(event, data){
        defaultReset(true);
        tip_count = 0;
        meal_count = 0;
    });
})

.controller('ChargesCtrl', function($scope){
    var vm = this;
    
    function resetDefault(){
        // Default Customer Charges
        vm.subtotal = 0;
        vm.tip = 0;
    }
    
    resetDefault();
    
    $scope.$on('submit', function(event, data){
        vm.subtotal = data.subtotal;
        vm.tip = data.tip;
    });
    
    $scope.$on('reset', function(event, data){
        resetDefault();
    });
})

.controller('InfoCtrl', function($scope){
    var vm = this;
    
    function resetDefault(){
        // Default Earnings Info
        vm.tiptotal_count = 0;
        vm.meal_count = 0;
        vm.average_count = 0;
    }
    
    resetDefault();
    
    $scope.$on('submit', function(event, data){
        vm.tiptotal_count = data.tiptotal_count;
        vm.meal_count = data.meal_count;
        vm.average_count = data.average_count;
    });
    
    $scope.$on('reset', function(event, data){
        resetDefault();
    });
});