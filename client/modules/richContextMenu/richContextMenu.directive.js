angular.module('richContextMenu.directive', [
  'dftm.ui'
])

.directive('richContextMenu', ['Mouse', function(Mouse){
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      trigger: '='
    },
    templateUrl: 'modules/richContextMenu/richContextMenu.html',
    link: function($scope, $element, $atts, $ctrls){
      $scope.$watch('trigger', function(newValue, oldValue){
        if(oldValue !== newValue){
          if(newValue){
            onOpening();
          }else{
            onClosing();
          }
        }
      });

      var onOpening = function(){
        $scope.position = Mouse.getOnClientLocation();
      };
      var onClosing = function(){
      };

      $scope.open = function(){
        if(!$scope.trigger){
          $scope.$apply(function(){
            $scope.trigger = true;
          });
        }
      };

      $scope.close = function(){
        if($scope.trigger){
          $scope.$apply(function(){
            $scope.trigger = false;
          });
        }
      };

      $scope.$on('contextMenu', function(){
        $scope.open();
      });
      document.addEventListener('click', function(){
        $scope.close();
      });
    },
    controller: function($scope){
      $scope.i = $scope.i || 0;
      $scope.i++;
      $scope.rand = $scope.rand || []
      $scope.rand.push(Math.floor(100*Math.random()));
    }
  }
}]);
