angular.module('EspeciesModule')

.controller('EspeciesDetailController', function($scope, Especie, especie){
    
    var initView = function(){
        $scope.especie = especie;
    };
    
    $scope.$on('$ionicView.loaded', function(){
        initView();
    });
});