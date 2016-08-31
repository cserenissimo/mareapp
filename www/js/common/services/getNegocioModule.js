angular.module('getNegocioModule', ['negociosModel'])

.constant('negNames', [
        'barrameda mediacion',
        'pesca sanlucar nautica',
        'pesca a bordo',
        'pesca subantartida',
        'vito pesca'
])

.constant('negApi', (function(){
    var namePlaceholder = '[namePlaceholder]';
    
    return{
        url: 'http://www.barramedamediacion.com/api/testing/getNegocios.php?cons=' + namePlaceholder,
        namePlaceholder: namePlaceholder
    };
})()
)

.factory('NegociosService', function($http, $q, negNames, negApi, Negocio){
    var negociosService = {};
    
    negociosService.negocios = [];
    negociosService.selectedNegocio = null;
    
    var urlFromName = function(nombre){
        //replace spaces by + 
        var queryString = nombre.split(' ').join('%20');
        //replace placeholder by query
        var url = negApi.url.replace(negApi.namePlaceholder, queryString);
        return url;
    }
    
    var selectNegocioByName = function(nombre){
        for(var i=0; i< negociosService.negocios.length; i++){
            if(negociosService.negocios[i].nombre === nombre){
                return negociosService.negocios[i];
            }
        };
        return null;
    };

    var selectPositionByName = function(nombre){
        for(var i=0; i< negociosService.negocios.length; i++){
            if(negociosService.negocios[i].nombre === nombre){
                return i;
            }
        };
        return null;
    };
    
    negociosService.getNegocio = function(nombre){
        var deferred = $q.defer();
        
        if(negociosService.negocios.length > 0){
            negociosService.selectedNegocio = selectNegocioByName(nombre);
            deferred.resolve(negociosService.selectedNegocio);
        }else{
            $http.get(urlFromName(nombre), {}).then(
                function(response){
                    negociosService.selectedNegocio = Negocio.build(response.data);
                    deferred.resolve(negociosService.selectedNegocio);
                },
                function(error){
                    negociosService.selectedNegocio = null;
                    deferred.resolve(null);
                });
        }
        
        return deferred.promise;
    };
    
    negociosService.getNegocios = function(){
        var deferred = $q.defer();
        if(negociosService.negocios.length > 0){
            deferred.resolve(negociosService.negocios);
        }else{
            var nDownloads = 0;
            var someErrorOcured = false;
            var resolveIfFinished = function(succes){
                nDownloads++;
                if(!succes){
                    someErrorOcured = true;
                }
                if(nDownloads === negNames.length){
                    if(!someErrorOcured){
                        deferred.resolve(negociosService.negocios);
                    }else{
                        deferred.reject();
                    }
                }
            };
            
            for(var i=0; i<negNames.length; i++){
                $http.get(urlFromName(negNames[i]), {}).then(
                    function(response){
                        negociosService.negocios.push(Negocio.build(response.data));
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
    
    return negociosService;
})