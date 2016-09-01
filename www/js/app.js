// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'MareasModule', 'EspeciesModule', 'PescaModule', 'NegocioModule', 'GiornoModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    var admobApp = angular.module('mareapp', ['ionic'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.device && typeof AdMob !== "undefined") {
                var admob_key = device.platform == "Android" ? "ca-app-pub-2440129720714268/2709403539" : "ca-app-pub-2440129720714268/2709403539";
    
                AdMob.createBanner( {
                  adId: admob_key,
                  position: AdMob.AD_POSITION.BOTTOM_CENTER,
                  isTesting: false,
                  adSize: 'SMART_BANNER',
                  success: function(){
                  },
                  error: function(){
                    console.log('failed to create banner');
                  }
                });
            }
        });
    });
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'js/app/menu/menu.html'
  })
  
    .state('app.mareas', {
    url: '/mareas',
    views:{
        'content':{
            templateUrl: 'js/app/main/mareas.html',
            controller: 'MareasController',
            resolve:{
                marea: function(MareasService){
                    return MareasService.getMarea();
                }
            }
        }
    }
  })
  
  .state('app.mfechas', {
    url: '/mfechas',
    views:{
        'content':{
            templateUrl: 'js/app/mfechas/mfechas.html',
            controller: 'GiornoController',
            resolve:{
                marea: function(GiornoService){
                    return GiornoService.getMarea();
                }
            }
        }
    }
  })
  
    .state('app.especies', {
    url: '/especies',
    views:{
        'content':{
            templateUrl: 'js/app/especies/especies.html',
            controller: 'EspeciesController',
            resolve:{
                especies: function(EspeciesService){
                    return EspeciesService.getEspecies();
                }
            }
        }
    }
  })

    .state('app.especies-detail', {
    url: '/especies/:especieName',
    views:{
        'content':{
            templateUrl: 'js/app/especies/especies-detail.html',
            controller: 'EspeciesDetailController',
            resolve:{
                especie: function(EspeciesService, $stateParams){
                    return EspeciesService.getEspecie($stateParams.especieName);
                }
            }
        }
    }
  })

    .state('app.pesca', {
    url: '/pesca',
    views:{
        'content':{
            templateUrl: 'js/app/pesca/pesca.html',
            controller: 'PescaController',
            resolve:{
                pescas: function(PescaService){
                    return PescaService.getPescas();
                }
            }
        }
    }
  })

    .state('app.pesca-detail', {
    url: '/pesca/:pescaName',
    views:{
        'content':{
            templateUrl: 'js/app/pesca/pesca-detail.html',
            controller: 'PescaDetailController',
            resolve:{
                pesca: function(PescaService, $stateParams){
                    return PescaService.getPesca($stateParams.pescaName);
                }
            }
        }
    }
  })
  
    .state('app.negocio', {
    url: '/negocio',
    views:{
        'content':{
            templateUrl: 'js/app/negocio/negocio.html',
            controller: 'NegocioController',
            resolve:{
                negocios: function(NegociosService){
                    return NegociosService.getNegocios();
                }
            }
        }
    }
  })

    .state('app.negocio-detail', {
    url: '/negocio/:negocioName',
    views:{
        'content':{
            templateUrl: 'js/app/negocio/negocio-detail.html',
            controller: 'NegocioDetailController',
            resolve:{
                negocio: function(NegociosService, $stateParams){
                    return NegociosService.getNegocio($stateParams.negocioName);
                }
            }
        }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/mareas');
});
