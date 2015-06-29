angular.module('isotope.directive', [])

// simple wrapper for isotope
.directive('isotope', [
      '$timeout',
      '$rootScope',
      '$debounce',
      'Isotope',
      function($timeout, $rootScope, $debounce, Isotope) {
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
            var INTERVAL = 100;

            $scope.renderedElements = [
              {_id:1},
              {_id:2},
              {_id:3},
            ];
            console.log($elem);

            $scope.$on('pageScroll', function($evt, a, locals) {
              scrollPosition = locals.$positive;
              console.log(scrollPosition);
              stageHeight = locals.$height;
              $debounce(pushWhile, INTERVAL*1);
              $debounce(popWhile, INTERVAL*5);
              // if(locals.$negative > -300) {
              //   console.log('push !');
              //   var count = 1;
              //   while(index < $scope.elements.length && count > 0) {
              //     count--;
              //     $scope.renderedElements.push($scope.elements[index++]);
              //     console.log($scope.renderedElements.length);
              //     $debounce(Isotope.relayout);
              //   }
              // } else if (locals.$direction < 0 && locals.$negative < -600) {
              //   popWhile(locals.$positive);
              // }
            });

            function pushWhile() {
              if($elem.height() < stageHeight * 2 + scrollPosition && $scope.renderedElements.length < $scope.elements.length) {
                $scope.renderedElements.push($scope.elements[$scope.renderedElements.length]);
                Isotope.relayout();
                $timeout(function() {
                  pushWhile();
                }, INTERVAL);
                }
              }


              function popWhile() {
                if($elem.height() > stageHeight * 4 + scrollPosition) {
                  $scope.renderedElements.pop();
                  Isotope.relayout();
                  $timeout(function() {
                    popWhile();
                  }, INTERVAL);
                }
              }

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
