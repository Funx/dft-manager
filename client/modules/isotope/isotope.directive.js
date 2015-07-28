angular.module('isotope.directive', [])

// simple wrapper for isotope
.directive('isotope', [
      '$timeout',
      '$rootScope',
      '$throttle',
      function($timeout, $rootScope, $throttle) {
        return {
          restrict: 'EA',
          transclude: true,
          scope: {
            elements: '='
          },
          templateUrl: '/modules/isotope/isotope.html',
          link: function($scope, $elem) {

            $scope.renderedElements = [
              {_id:1},
              {_id:2},
              {_id:3},
            ]
          }
        }
      }
    ])

    .directive('inject', () => {
      return {
        link: function($scope, $element, $attrs, controller, $transclude) {
          if (!$transclude) {
            throw minErr('ngTransclude')('orphan',
              'Illegal use of ngTransclude directive in the template! ' +
              'No parent directive that requires a transclusion found. ' +
              'Element: {0}',
              startingTag($element))
          }
          var innerScope = $scope.$new()
          $transclude(innerScope, (clone) => {
            $element.empty()
            $element.append(clone)
            $element.on('$destroy', () => {
              innerScope.$destroy()
            })
          })
        }
      }
    })
