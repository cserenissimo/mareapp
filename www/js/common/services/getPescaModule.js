angular.module('getPescaModule', ['pescaModel'])

.constant('zonaNames', [
        'Playa del Coto',
        'Playa de la Calzada',
        'Playa de las Redes',
        'Playa de los Toruños',
        'La Puntilla El Espigón',
        'Playa de la Costilla'
])

.constant('pescaApi', (function(){
    var namePlaceholder = '[namePlaceholder]';
    
    return{
        url: 'http://www.barramedamediacion.com/api/testing/getPesca.php?cons=' + namePlaceholder,
        namePlaceholder: namePlaceholder
    };
})()
)

.factory('PescaService', function($http, $q, zonaNames, pescaApi, Pesca){
    var pescaService = {};
    
    pescaService.pescas = [];
    pescaService.selectedPesca = null;
    
    var urlFromName = function(nombre){
        //replace spaces by + 
        var queryString = nombre.split(' ').join('+');
        //replace placeholder by query
        var url = pescaApi.url.replace(pescaApi.namePlaceholder, queryString);
        return url;
    }
    
    var selectPescaByName = function(nombre){
        for(var i=0; i< pescaService.pescas.length; i++){
            if(pescaService.pescas[i].nombre === nombre){
                return pescaService.pescas[i];
            }
        };
        return null;
    };

    var selectPositionByName = function(nombre){
        for(var i=0; i< pescaService.pescas.length; i++){
            if(pescaService.pescas[i].nombre === nombre){
                return i;
            }
        };
        return null;
    };
    
    pescaService.getPesca = function(nombre){
        var deferred = $q.defer();
        
        if(pescaService.pescas.length > 0){
            pescaService.selectedPescae = selectPescaByName(nombre);
            deferred.resolve(pescaService.selectedPescae);
        }else{
            $http.get(urlFromName(nombre), {}).then(
                function(response){
                    pescaService.selectedPesca = Pesca.build(response.data);
                    deferred.resolve(pescaService.selectedPesca);
                },
                function(error){
                    pescaService.selectedPesca = null;
                    deferred.resolve(null);
                });
        }
        
        return deferred.promise;
    };
    
    pescaService.getPescas = function(){
        var deferred = $q.defer();
        if(pescaService.pescas.length > 0){
            deferred.resolve(pescaService.pescas);
        }else{
            var nDownloads = 0;
            var someErrorOcured = false;
            var resolveIfFinished = function(succes){
                nDownloads++;
                if(!succes){
                    someErrorOcured = true;
                }
                if(nDownloads === zonaNames.length){
                    if(!someErrorOcured){
                        deferred.resolve(pescaService.pescas);
                    }else{
                        deferred.reject();
                    }
                }
            };
            
            for(var i=0; i<zonaNames.length; i++){
                $http.get(urlFromName(zonaNames[i]), {}).then(
                    function(response){
                        pescaService.pescas.push(Pesca.build(response.data));
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
    
    return pescaService;
})