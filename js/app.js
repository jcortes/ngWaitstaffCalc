angular.module('waitCalc', ['ngMessages'])

.controller('calCtrl', function ($scope) {
    
    $scope.data = {};
    
    // Meal Detailes fields
    $scope.data.base_meal_price = null;
    $scope.data.tax_rate = null;
    $scope.data.tip_perc = null;
    
    // Default Customer Charges
    $scope.data.subtotal = 0;
    $scope.data.tip = 0;
    
    // Default Earnings Info
    $scope.data.tiptotal_count = 0;
    $scope.data.meal_count = 0;
    $scope.data.average_count = 0;
    
    var tip_count = 0;
    var meal_count = 0;
    
    $scope.submit = function(){
        
        if($scope.frm.$valid){
            var bmp = $scope.data.base_meal_price;
            var tr = $scope.data.tax_rate;
            var t = $scope.data.tip_perc;
            
            var tax = (bmp * tr)/100;
            var subtotal = bmp + tax;
            var tip = (subtotal * t)/100;
            
            tip_count = tip_count + tip;
            meal_count = meal_count + 1;
            
            var average_count = tip_count / meal_count;
            
            // Customer Charges
            $scope.data.subtotal = subtotal;
            $scope.data.tip = tip;
            
            // Earnings Info
            $scope.data.tiptotal_count = tip_count;
            $scope.data.meal_count = meal_count;
            $scope.data.average_count = average_count;
        }
    };
    
    $scope.clear = function(){
        $scope.frm.$submitted = false;
        $scope.data.base_meal_price = null;
        $scope.data.tax_rate = null;
        $scope.data.tip_perc = null;
    };
    
    $scope.reset = function(){
        $scope.frm.$submitted = false;
        $scope.data.base_meal_price = null;
        $scope.data.tax_rate = null;
        $scope.data.tip_perc = null;
        
        // Default Customer Charges
        $scope.data.subtotal = 0;
        $scope.data.tip = 0;

        // Default Earnings Info
        $scope.data.tiptotal_count = 0;
        $scope.data.meal_count = 0;
        $scope.data.average_count = 0;
    };
});