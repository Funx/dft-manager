angular.module('isotope.service', [])

.factory('Isotope', [
  '$rootScope',
  '$timeout',
  function($rootScope, $timeout){
    return {
      relayout: function(){
        $timeout(function(){
          $rootScope.$broadcast('iso-init', {name:null, params:null});
        })
      }
    }
  }
])
