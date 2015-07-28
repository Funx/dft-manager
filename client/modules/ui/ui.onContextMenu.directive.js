angular.module('ui.onContextMenu.directive', [])

.directive('onContextMenu', function($timeout) {
	return {
		restrict: 'A',
		link: function($scope, $elm, $attrs) {

			function triggerEvent() {
				$scope.$emit('contextMenu')
				$scope.$apply(() => {
          $scope.$eval($attrs.onContextMenu)
        })
			}

      //==== handle right click
      document.oncontextmenu = (e) => {
        if(e.target.hasAttribute('on-context-menu')) {
        }
      }

      $elm.bind('contextmenu',(e) => {
				triggerEvent()
				e.preventDefault()
      })

      //==== handle long press
			$elm.bind('touchstart', (evt) => {
				// Locally scoped variable that will keep track of the long press
				if(evt.touches.length == 1){

          $scope.longPress = true

  				// We'll set a timeout for 600 ms for a long press
  				$timeout(() => {
  					if ($scope.longPress) {
  						// If the touchend event hasn't fired,
  						// apply the function given in on the element's on-long-press attribute
							triggerEvent()
  					}
  				}, 600)
        }

			})

      $elm.bind('touchmove', (evt) => {
        // Prevent the onLongPress event from firing
				$scope.longPress = false
				// If there is an on-touch-end function attached to this element, apply it
				if ($attrs.onTouchEnd) {
					$scope.$apply(() => {
						$scope.$eval($attrs.onTouchMove)
					})
				}
      })

			$elm.bind('touchend', (evt) => {
				// Prevent the onLongPress event from firing
				$scope.longPress = false
				// If there is an on-touch-end function attached to this element, apply it
				if ($attrs.onTouchEnd) {
					$scope.$apply(() => {
						$scope.$eval($attrs.onTouchEnd)
					})
				}
			})
		}
	}
})
