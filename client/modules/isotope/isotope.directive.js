angular.module('isotope.directive', [])

// simple wrapper for isotope
.directive('isotope', [
      '$timeout',
      '$rootScope',
      '$throttle',
      'Isotope',
      function($timeout, $rootScope, $throttle, Isotope) {
        return {
          restrict: 'EA',
          transclude: true,
          scope: {
            elements: '='
          },
          templateUrl: 'modules/isotope/isotope.html',
          link: function($scope, $elem) {
            var index = 0;
            var scrollPosition = 0;
            var stageHeight = 1200;
            var firstInit = true;
            var INTERVAL = 250;
            var relayout = $throttle(1000, Isotope.relayout);
            var onScroll = $throttle(500, function(){
              $throttle(5000,pushWhile)();
            });

            $scope.renderedElements = [
              {_id:1},
              {_id:2},
              {_id:3},
            ];

              $scope.$watch(function() {
                return $scope.elements.length;
              }.bind(this), function() {
                $scope.renderedElements = $scope.elements;
                Isotope.relayout();
              });

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
