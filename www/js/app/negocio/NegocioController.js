angular.module('NegocioModule')

.controller('NegocioController', function($scope, Negocio, negocios){
   
   var initView = function(){
    
        $scope.negocios = negocios;
   };
   
   $scope.$on('$ionicView.loaded', function(){
        initView();
   }); 
});