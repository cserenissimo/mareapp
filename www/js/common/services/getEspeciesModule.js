angular.module('getEspeciesModule', ['especieModel'])

.constant('especieNames', [
        'Baila',
        'Corvina',
        'Dorada',
        'Herrera',
        'Mojarra',
        'Robalo',
        'Sargo',
        'Verrugato',
        'Corvina'
])

.constant('especieApi', (function(){
    var namePlaceholder = '[namePlaceholder]';
    
    return{
        url: 'http://www.barramedamediacion.com/api/testing/getEspecies.php?cons=' + namePlaceholder,
        namePlaceholder: namePlaceholder
    };
})()
)

.factory('EspeciesService', function($http, $q, especieNames, especieApi, Especie){
    var especiesService = {};
    
    especiesService.especies = [];
    especiesService.selectedEspecie = null;
    
    var urlFromName = function(nombre){
        //replace spaces by + 
        var queryString = nombre.split(' ').join('+');
        //replace placeholder by query
        var url = especieApi.url.replace(especieApi.namePlaceholder, queryString);
        return url;
    }
    
    var selectEspecieByName = function(nombre){
        for(var i=0; i< especiesService.especies.length; i++){
            if(especiesService.especies[i].nombre === nombre){
                return especiesService.especies[i];
            }
        };
        return null;
    };

    var selectPositionByName = function(nombre){
        for(var i=0; i< especiesService.especies.length; i++){
            if(especiesService.especies[i].nombre === nombre){
                return i;
            }
        };
        return null;
    };
    
    especiesService.getEspecie = function(nombre){
        var deferred = $q.defer();
        
        if(especiesService.especies.length > 0){
            especiesService.selectedEspecie = selectEspecieByName(nombre);
            deferred.resolve(especiesService.selectedEspecie);
        }else{
            $http.get(urlFromName(nombre), {}).then(
                function(response){
                    especiesService.selectedEspecie = Especie.build(response.data);
                    deferred.resolve(especiesService.selectedEspecie);
                },
                function(error){
                    especiesService.selectedEspecie = null;
                    deferred.resolve(null);
                });
        }
        
        return deferred.promise;
    };
    
    especiesService.getEspecies = function(){
        var deferred = $q.defer();
        if(especiesService.especies.length > 0){
            deferred.resolve(especiesService.especies);
        }else{
            var nDownloads = 0;
            var someErrorOcured = false;
            var resolveIfFinished = function(succes){
                nDownloads++;
                if(!succes){
                    someErrorOcured = true;
                }
                if(nDownloads === especieNames.length){
                    if(!someErrorOcured){
                        deferred.resolve(especiesService.especies);
                    }else{
                        deferred.reject();
                    }
                }
            };
            
            for(var i=0; i<especieNames.length; i++){
                $http.get(urlFromName(especieNames[i]), {}).then(
                    function(response){
                        especiesService.especies.push(Especie.build(response.data));
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
    
    return especiesService;
})