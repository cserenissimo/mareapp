angular.module('getMareasModule', ['mareaModel'])

.constant('mareaDates', [
        '0000 00 00',
])

.constant('mareasApi', (function(){
    var namePlaceholder = '[namePlaceholder]';
    
    return{
        url: 'http://www.barramedamediacion.com/api/testing/getMareas.php?cons=' + namePlaceholder,
        namePlaceholder: namePlaceholder
    };
})()
)

.factory('MareasService', function($http, $q, mareaDates, mareasApi, Marea){
    var mareasService = {};
    
    mareasService.mareas = [];
    mareasService.selectedMarea = null;
    
    var urlFromDate = function(){
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1; //hoy es 0!
        var yyyy = hoy.getFullYear();
        var queryString = yyyy+'-'+mm+'-'+dd;
        var url = mareasApi.url.replace(mareasApi.namePlaceholder, queryString);
        return url;
    }
    
    var selectMareaByDate = function(fecha){
        for(var i=0; i< mareasService.mareas.length; i++){
            if(mareasService.mareas[i].fecha === fecha){
                return mareasService.mareas[i];
            }
        };
        return null;
    }
    
    mareasService.getMarea = function(fecha){
        var deferred = $q.defer();
        
        if(mareasService.mareas.length > 0){
            mareasService.selectedMarea = selectMareaByTitle(fecha);
            deferred.resolve(mareasService.selectedMarea);
        }else{
            $http.get(urlFromDate(fecha), {}).then(
                function(response){
                    mareasService.selectedMarea = Marea.build(response.data);
                    deferred.resolve(mareasService.selectedMarea);
                },
                function(error){
                    mareasService.selectedMarea = null;
                    deferred.resolve(null);
                });
        }
        return deferred.promise; 
    };
    
    mareasService.getMareas = function(){
        var deferred = $q.defer();
        if(mareasService.mareas.length > 0){
            deferred.resolve(mareasService.mareas);
        }else{
            var nDownloads = 0;
            var someErrorsOcured = false;
            var resolveIfFinished = function(succes){
                nDownloads ++;
                if(!succes){
                    someErrorsOcured = true;
                }
                if(nDownloads === mareaDates.length){
                    if(!someErrorsOcured){
                        deferred.resolve(mareasService.mareas);
                    }else{
                        deferred.reject();
                    }
                }
            };
            
            for(var i=0; i < mareaDates.length; i++){
                $http.get(urlFromDate(mareaDates[i]), {}).then(
                    function(response){
                        mareasService.mareas.push(Marea.build(response.data));
                        resolveIfFinished(true);
                    },
                    function(error){
                        resolveIfFinished(false);
                    }
                );
            }
        }
        return deferred.promise;
    };
    
    return mareasService;
})