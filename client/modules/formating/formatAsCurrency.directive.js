angular.module('formatAsCurrency.directive', [])

.directive('formatAsCurrency', [
  '$debounce',
  function($debounce) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelController) {
        var currency = attrs.formatAsCurrency;

        ngModelController.$parsers.push(function(input) {
          //convert data from view format to model format
          if (input) {
            input = input.toString()
              .replace(/\s\D/g, '');
            input = parseInt(input);
          }
          // console.log('model formatting :',input);
          return input || null; //converted
        });

        ngModelController.$formatters.push(function(input) {
          //convert data from model format to view format
          if (input) {
            input =
              input.toString()
              .replace(currency, '')
              .replace(/\s\D/g, '')
              .reverse().replace(/(.{3})/g, '$1 ').reverse()
              .trim();
            if(input){
              input += ' ' + currency;
            }
          }
          // console.log('view formatting :',input);
          return input || null;
        });

        element.bind('change', function() {
          $debounce(function() {
            var ctrl = ngModelController;
            var viewValue = ctrl.$modelValue;
            for (var i in ctrl.$formatters) {
              viewValue = ctrl.$formatters[i](viewValue);
            }
            ctrl.$viewValue = viewValue;
            ctrl.$render();
          }, 50);
        });
      }
    }
  }
])
