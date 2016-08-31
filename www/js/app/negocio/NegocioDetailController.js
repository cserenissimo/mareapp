angular.module('NegocioModule')

.controller('NegocioDetailController', function($scope, Negocio, negocio){
    
    var initView = function(){
        $scope.negocio = negocio;
    };
    
    $scope.$on('$ionicView.loaded', function(){
        initView();
    });
});