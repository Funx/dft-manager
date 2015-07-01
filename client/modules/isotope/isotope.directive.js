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
          templateUrl: 'modules/isotope/isotope.html',
          link: function($scope, $elem) {

            $scope.renderedElements = [
              {_id:1},
              {_id:2},
              {_id:3},
            ];

            // $scope.$watch(function() {
            //   return $scope.elements.length;
            // }.bind(this), function() {
            //   // var sliceTo = Math.max($scope.renderedElements.length, 20)
            //   // $scope.renderedElements = $scope.elements.slice(0, sliceTo);
            //   $scope.renderedElements = $scope.elements;
            // });

          }
        }
      }
    ])

    .directive('inject', function() {
      return {
        link: function($scope, $element, $attrs, controller, $transclude) {
          if (!$transclude) {
            throw minErr('ngTransclude')('orphan',
              'Illegal use of ngTransclude directive in the template! ' +
              'No parent directive that requires a transclusion found. ' +
              'Element: {0}',
              startingTag($element));
          }
          var innerScope = $scope.$new();
          $transclude(innerScope, function(clone) {
            $element.empty();
            $element.append(clone);
            $element.on('$destroy', function() {
              innerScope.$destroy();
            });
          });
        }
      };
    });
