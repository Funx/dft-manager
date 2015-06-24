angular.module('card.directive', [])

.directive('card', [
  function(){
    return {
      restrict: 'AE',
      templateUrl: 'modules/card/card.html',
      controllerAs: 'card',
      bindToController: {
        model: '=card'
      },
      controller: function(){},
      scope: {},
      link: function($scope, $elem, $attrs){}
    };
  }
]);
