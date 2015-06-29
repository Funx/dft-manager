angular.module('card.directive', [])

.directive('card', [
  'Isotope',
  function(Isotope){
    return {
      restrict: 'AE',
      templateUrl: 'modules/card/card.html',
      controllerAs: 'card',
      bindToController: {
        model: '=card'
      },
      controller: function(){},
      scope: {},
      link: function($scope, $elem, $attrs){},
      controller: function() {
        this.makeBigger = function(){
          this.model.bigger = !this.model.bigger;
          Isotope.relayout();
        }
      }
    };
  }
]);
