angular.module('richContextMenu.directive', [
  'dftm.ui'
])

.directive('richContextMenu', ['Mouse', (Mouse) => {
  return {
    restrict: 'EA',
    transclude: true,
    scope: {
      trigger: '='
    },
    templateUrl: '/modules/richContextMenu/richContextMenu.html',
    link: function($scope, $element, $atts, $ctrls){
      $scope.$watch('trigger', (newValue, oldValue) => {
        if(oldValue !== newValue){
          if(newValue){
            onOpening()
          }else{
            onClosing()
          }
        }
      })

      var onOpening = () => {
        $scope.position = Mouse.getOnClientLocation()
      }
      var onClosing = () => {
      }

      $scope.open = () => {
        if(!$scope.trigger){
          $scope.$apply(() => {
            $scope.trigger = true
          })
        }
      }

      $scope.close = () => {
        if($scope.trigger){
          $scope.$apply(() => {
            $scope.trigger = false
          })
        }
      }

      $scope.$on('contextMenu', () => {
        $scope.open()
      })
      document.addEventListener('click', () => {
        $scope.close()
      })
    },
    controller: function($scope){
      $scope.i = $scope.i || 0
      $scope.i++
      $scope.rand = $scope.rand || []
      $scope.rand.push(Math.floor(100*Math.random()))
    }
  }
}])
