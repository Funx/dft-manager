angular.module('amazingQuery.directive', [])

.directive('amazingQuery', [
  'slugifyFilter',
  (slugify) => {
    return {
      restrict: 'AE',
      templateUrl: '/modules/amazingQuery/amazingQuery.html',
      controllerAs: 'amazing',
      require: '^ngModel',
      bindToController: {
        triggerCHange: '&onChange'
      },
      controller: () => {},
      scope: {},
      link: function($scope, $elem, $attrs, ngModelCtrl){
        console.log(ngModelCtrl)
      },
      controller: () => {

      }
    }
  }
])
