angular.module('contextMenu.directive', [])

.directive('contextMenu', [function(){
  return {
    restrict: 'EA',
    transclude: true,
    link: function($scope, $element, $atts, $ctrls){

      $scope.open = function(){
        console.log('open');
      };

      $scope.close = function(){
        console.log('close');
      };

      $scope.$on('contextMenu', function(){
        $scope.open();
      });

      $element.find('a').bind('click', function(){
        $scope.close();
      });
    }
  }
}]);
