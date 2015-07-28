angular.module('actionBubble.directive', [])
.directive('actionBubble', [() => {
  return {
    restrict: "AE",
    priority: 0,
    scope: true,
    templateUrl: '/modules/actionBubble/actionBubble.html',
    link: function($scope, $element, $attributes, $ctrls){
      $scope.hide = () => {
        $scope.actionView = false
      }

      $scope.displayEditor = () => {
        $scope.actionView = 'create'
      }

    }
  }
}])
