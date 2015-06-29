angular.module('isotope.directive', [])

// simple wrapper for isotope
.directive('isotope', [
  '$timeout',
  '$rootScope',
  function($timeout, $rootScope){
    return {
      restrict: 'EA',
      transclude: true,
      scope:{elements: '='},
      template: '<div class="deck" isotope-container="isotope-container"><div isotope-item="isotope-item" class="deck__card__wrapper--outer card__wrapper--outer" ng-class="{bigger: element.bigger}" ng-repeat="element in elements track by element._id" inject></div></div>',
      link: function($scope){
        $scope.$watch(function(){
          return $scope.elements.length;
        }.bind(this), function(){
          $timeout(function(){
            $rootScope.$broadcast('iso-init', {name:null, params:null});
          })
        });
      }
    }
  }
])

.directive('inject', function(){
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
