angular.module('card.directive', [])

.directive('card', [
  'Isotope',
  'Families',
  'slugifyFilter',
  function(Isotope, Families, slugify){
    return {
      restrict: 'AE',
      templateUrl: 'modules/card/card.html',
      scope: {},
      controllerAs: 'card',
      bindToController: {
        model: '=card',
        expanded: '='
      },
      controller: function(){},
      link: function($scope, $elem, $attrs){
        ctrl = $scope.card;
        ctrl.select = function selectCard () {
          ctrl.selected = true;
          $scope.$emit('selected', ctrl.model);
        }
        ctrl.unselect = function unselectCard () {
          ctrl.selected = false;
          $scope.$emit('unselected', ctrl.model);
        }
        ctrl.toggleSelection = function toggleCardSelection () {
          ctrl.selected ? ctrl.unselect() : ctrl.select();
        }

      },
      controller: function() {
        var lowerBoundRate = 10;
        var lowerBound = 20000;
        var higherBoundRate = 200;

        var disabledLuminosity = 70;
        var disabledSaturation = 30;

        var minLuminosity = 40;
        var maxLuminosity = 50;
        var minSaturation = 50;
        var maxSaturation = 90;

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
           return this.getPonderedValue({
             min: minSaturation
            ,max: maxSaturation
            ,disabled: disabledSaturation
            ,reverse: false
          })
        }

        this.getLuminosity = function() {
          return this.getPonderedValue({
             min: minLuminosity
            ,max: maxLuminosity
            ,disabled: disabledLuminosity
            ,reverse: true
          })
        }

        this.model.category = this.model.category
        this.family = Families.get(slugify(this.model.category))
        this.model.benefits = this.calcBenefits()
        this.model.benefitsRate = this.calcBenefitsRate()

        this.model.keyWords = ['all'];

        i = 1;
        while(this.calcBenefitsRate() > 10 * i) {
          this.model.keyWords.push('>' + i + '0%')
          i++
        }

        if(this.isLucrative()) this.model.keyWords.push('lucrative');

        if(!this.hasPrice()) this.model.keyWords.push('no price', '!price');

        if(!this.model.recipe || !this.model.recipe.length) this.model.keyWords.push('no recipe');

      }
    };
  }
]);
