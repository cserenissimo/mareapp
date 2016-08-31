angular.module('MareasModule')

.controller('MareasController', function($scope, Marea, marea){
   
   var initView = function(){
    
        $scope.marea = marea;
   };
   
   $scope.$on('$ionicView.loaded', function(){
        initView();
   });
 
});