angular.module('card.directive', [])

.directive('card', [
  'Isotope',
  'Families',
  'slugifyFilter',
  function(Isotope, Families, slugify){
    return {
      restrict: 'AE',
      templateUrl: 'modules/card/card.html',
      controllerAs: 'card',
      bindToController: {
        model: '=card'
      },
      controller: function(){},
      scope: {},
      link: function($scope, $elem, $attrs){
        $scope.Math = window.Math;
      },
      controller: function() {

        this.makeBigger = function () {
          this.model.bigger = !this.model.bigger;
          Isotope.relayout();
        }

        this.calcTauxBenef = function () {
          return (this.model.price / this.model.cost) * 100 - 100;
        }

        this.getSaturation = function() {
          console.log('getSaturation');
           return Math.max(Math.min(this.calcTauxBenef() / 2, 80), 10);
        }

        this.getLuminosity = function() {
           return Math.max(Math.min(this.calcTauxBenef() / 2, 80), 10);
        }

        Families.get(function(data){
          this.family = data[slugify(this.model.category)];
        }.bind(this));
      }
    };
  }
]);
