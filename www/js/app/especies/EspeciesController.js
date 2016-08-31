angular.module('EspeciesModule')

.controller('EspeciesController', function($scope, Especie, especies){
   
   var initView = function(){
    
        $scope.especies = especies;
   };
   
   $scope.$on('$ionicView.loaded', function(){
        initView();
   });
 
});