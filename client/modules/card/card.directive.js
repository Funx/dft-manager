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
        var lowerBoundRate = 10;
        var lowerBound = 20000;
        var higherBoundRate = 200;

        var disabledLuminosity = 5;
        var disabledSaturation = 100;

        var minLuminosity = 30;
        var maxLuminosity = 60;
        var minSaturation = 10;
        var maxSaturation = 70;

        this.getPonderedValue = function (options) {

          var benefitsRate = this.calcBenefitsRate();
          var benefits = this.calcBenefits();

          if (benefitsRate > higherBoundRate || !this.hasPrice()) return options.reverse ? options.min : options.max;
          if (!this.isLucrative()) return options.disabled || 0;

          var value = (benefitsRate / (higherBoundRate - lowerBoundRate)) * (options.max - options.min) + options.min;

          return options.reverse ? 100 - value : value;
        }.bind(this);

        this.isLucrative = function() {
          return !(this.calcBenefitsRate() < lowerBoundRate || this.calcBenefits() < lowerBound)
        }

        this.hasPrice = function() {
          return this.model.price ? true : false;
        }

        this.calcBenefits = function () {
          return this.model.price - this.model.cost || 0;
        }

        this.calcBenefitsRate = function () {
          return (this.model.price / this.model.cost) * 100 - 100 || 0;
        }

        this.getSaturation = function() {
           return this.getPonderedValue({min: minSaturation, max: maxSaturation, disabled: disabledSaturation, reverse: false});
        }

        this.getLuminosity = function() {
          return this.getPonderedValue({min: minLuminosity, max: maxLuminosity, disabled: disabledLuminosity, reverse: false});
        }

        this.model.category = this.model.category || 'base';
        this.family = Families.get(slugify(this.model.category));
        this.model.benefits = this.calcBenefits();
        this.model.benefitsRate = this.calcBenefitsRate();

        this.model.keyWords = ['all'];

        i = 1;
        while(this.calcBenefitsRate() > 10 * i) {
          this.model.keyWords.push('>' + i + '0%')
          i++
        }

        if(this.isLucrative()) this.model.keyWords.push('lucrative');

        if(!this.hasPrice()) this.model.keyWords.push('no price', '!price');

        if(!this.model.recipe.length) this.model.keyWords.push('no recipe');

      }
    };
  }
]);
