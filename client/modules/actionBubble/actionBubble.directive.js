angular.module('actionBubble.directive', [])
.directive('actionBubble', [function(){
  return {
    restrict: "AE",
    priority: 0,
    scope: true,
    templateUrl: '/modules/actionBubble/actionBubble.html',
    link: function($scope, $element, $attributes, $ctrls){
      $scope.hide = function(){
        $scope.actionView = false;
      }

      $scope.displayEditor = function(){
        $scope.actionView = 'create';
      }

    }
  }
}])
