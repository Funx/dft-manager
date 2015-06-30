angular.module('isotope.service', [])

.factory('Isotope', [
  '$rootScope',
  '$timeout',
  '$throttle',
  function($rootScope, $timeout, $throttle){
    return {
      relayout: function(){
        $timeout(function(){
          console.log('relayout');
          $rootScope.$broadcast('iso-init', {name:null, params:null});
        })
      }
    }
  }
])
