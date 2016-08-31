angular.module('getGiornoModule', ['mareaModel'])

.constant('mareaDates', [
        '2016 11 07',
])

.constant('mareasApi', (function(){
    var namePlaceholder = '[namePlaceholder]';
    
    return{
        url: 'http://www.barramedamediacion.com/api/testing/getMareas.php?cons=' + namePlaceholder,
        namePlaceholder: namePlaceholder
    };
})()
)

.factory('GiornoService', function($http, $q, mareaDates, mareasApi, Marea){
    var giornoService = {};
    
    giornoService.mareas = [];
    giornoService.selectedMarea = null;
    
    var urlFromDate = function(){
        var hoy = new Date();
        var cd = hoy.getDate();
        var cm = hoy.getMonth()+1; //hoy es 0!
        var cy = hoy.getFullYear();
        var queryString = cy+'-'+cm+'-'+cd;
        var url = mareasApi.url.replace(mareasApi.namePlaceholder, queryString);
        return url;
    }
    
    var selectMareaByDate = function(fecha){
        for(var i=0; i< giornoService.mareas.length; i++){
            if(giornoService.mareas[i].fecha === fecha){
                return giornoService.mareas[i];
            }
        };
        return null;
    }
    
    giornoService.getMarea = function(fecha){
        var deferred = $q.defer();
        
        if(giornoService.mareas.length > 0){
            giornoService.selectedMarea = selectMareaByTitle(fecha);
            deferred.resolve(giornoService.selectedMarea);
        }else{
            $http.get(urlFromDate(fecha), {}).then(
                function(response){
                    giornoService.selectedMarea = Marea.build(response.data);
                    deferred.resolve(giornoService.selectedMarea);
                },
                function(error){
                    giornoService.selectedMarea = null;
                    deferred.resolve(null);
                });
        }
        return deferred.promise; 
    };
    
    giornoService.getMareas = function(){
        var deferred = $q.defer();
        if(giornoService.mareas.length > 0){
            deferred.resolve(giornoService.mareas);
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
                        deferred.resolve(giornoService.mareas);
                    }else{
                        deferred.reject();
                    }
                }
            };
            
            for(var i=0; i < mareaDates.length; i++){
                $http.get(urlFromDate(mareaDates[i]), {}).then(
                    function(response){
                        giornoService.mareas.push(Marea.build(response.data));
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
    
    return giornoService;
})