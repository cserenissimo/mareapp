angular.module('PescaModule')

.controller('PescaDetailController', function($scope, Pesca, pesca){
    
    var initView = function(){
        $scope.pesca = pesca;
    };
    
    $scope.$on('$ionicView.loaded', function(){
        initView();
    });
});