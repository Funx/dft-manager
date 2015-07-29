angular.module('card.directive', [])

.directive('card', [
  'Isotope'
  ,'Families'
  ,'Selection'
  ,'slugifyFilter'
  ,(Isotope, Families, Selection, slugify) => {
    return {
      restrict: 'AE',
      templateUrl: '/modules/card/card.html',
      scope: {},
      controllerAs: 'card',
      bindToController: {
        model: '=card',
        expanded: '='
      },
      link: ($scope, $elem, $attrs) => {},
      controller: ['$scope', function cardCtrl ($scope) {
        var lowerBoundRate = 10
        var lowerBound = 20000
        var higherBoundRate = 200

        var disabledLuminosity = 70
        var disabledSaturation = 30

        var minLuminosity = 40
        var maxLuminosity = 50
        var minSaturation = 50
        var maxSaturation = 90

        this.getPonderedValue = (options) => {

          var benefitsRate = this.calcBenefitsRate()
          var benefits = this.calcBenefits()

          if (benefitsRate > higherBoundRate || !this.hasPrice()) return options.reverse ? options.min : options.max
          if (!this.isLucrative()) return options.disabled || 0

          var value = (benefitsRate / (higherBoundRate - lowerBoundRate)) * (options.max - options.min) + options.min

          return options.reverse ? 100 - value : value
        }

        this.isLucrative = () => {
          return !(this.calcBenefitsRate() < lowerBoundRate || this.calcBenefits() < lowerBound)
        }

        this.isSelected = () => {
          return Selection.isSelected(this.model)
        }

        this.hasPrice = () => {
          return this.model.price ? true : false
        }

        this.calcBenefits = () => {
          return this.model.price - this.model.cost || 0
        }

        this.calcBenefitsRate = () => {
          return (this.model.price / this.model.cost) * 100 - 100 || 0
        }

        this.getSaturation = () => {
           return this.getPonderedValue({
             min: minSaturation
            ,max: maxSaturation
            ,disabled: disabledSaturation
            ,reverse: false
          })
        }

        this.getLuminosity = () => {
          return this.getPonderedValue({
             min: minLuminosity
            ,max: maxLuminosity
            ,disabled: disabledLuminosity
            ,reverse: true
          })
        }

        this.select = function selectCard () {
          Selection.add(this.model)
        }
        this.unselect = function unselectCard () {
          Selection.remove(this.model)
        }
        this.toggleSelection = function toggleCardSelection () {
          this.isSelected() ? this.unselect() : this.select()
        }

        this.log = () => {
          console.log.apply(console, arguments)
        }

        this.model.category = this.model.category || ''
        this.family = Families.get(slugify(this.model.category))
        this.model.benefits = this.calcBenefits()
        this.model.benefitsRate = this.calcBenefitsRate()

        this.model.keyWords = ['all']

        var i = 1
        while(this.calcBenefitsRate() > 10 * i) {
          this.model.keyWords.push('>' + i + '0%')
          i++
        }

        if(this.isLucrative()) this.model.keyWords.push('lucrative')

        if(!this.hasPrice()) this.model.keyWords.push('no price', '!price')

        if(!this.model.recipe || !this.model.recipe.length) this.model.keyWords.push('no recipe')

      }]
    }
  }
])
