angular.module('PescaModule')

.controller('PescaController', function($scope, Pesca, pescas){
   
   var initView = function(){
    
        $scope.pescas = pescas;
   };
   
   $scope.$on('$ionicView.loaded', function(){
        initView();
   }); 
});