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
              $throttle(500,pushWhile)();
              $throttle(500,popWhile)();
            });

            $scope.renderedElements = [
              {_id:1},
              {_id:2},
              {_id:3},
            ];
            console.log($elem);

            $scope.$on('pageScroll', function($evt, a, locals) {
              scrollPosition = locals.$positive;
              stageHeight = locals.$height;
              onScroll();
            });

            var pushWhile = function() {
              if($elem.height() < stageHeight * 2 + scrollPosition && $scope.renderedElements.length < $scope.elements.length) {
                console.log('push');
                $scope.renderedElements.push($scope.elements[$scope.renderedElements.length]);
                relayout();
                $timeout(function() {
                  pushWhile();
                }, INTERVAL);
                }
              };


            var popWhile = function() {
                if($elem.height() > stageHeight * 4 + scrollPosition) {
                  console.log('pop');
                  $scope.renderedElements.pop();
                  relayout();
                  $timeout(function() {
                    popWhile();
                  }, INTERVAL);
                }
              };

              $scope.$watch(function() {
                return $scope.elements.length;
              }.bind(this), function() {
                console.log($scope.elements.length);
                if($scope.elements.length){
                  if(firstInit){
                    $scope.renderedElements = [];
                    pushWhile();
                    firstInit = false;
                  } else {
                    $scope.renderedElements = $scope.elements.slice(0, $scope.renderedElements.length);
                    Isotope.relayout();
                  }
                }
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
