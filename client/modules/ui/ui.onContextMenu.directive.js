angular.module('ui.onContextMenu.directive', [])

.directive('onContextMenu', function($timeout) {
	return {
		restrict: 'A',
		link: function($scope, $elm, $attrs) {

			function triggerEvent() {
				$scope.$emit('contextMenu');
				$scope.$apply(function() {
          $scope.$eval($attrs.onContextMenu);
					console.log($attrs.onContextMenu);
        });
			}

      //==== handle right click
      document.oncontextmenu = function (e) {
        if(e.target.hasAttribute('on-context-menu')) {
          return false;
        }
      };

      $elm.bind('contextmenu',function(e){
				triggerEvent();
      });

      //==== handle long press
			$elm.bind('touchstart', function(evt) {
				// Locally scoped variable that will keep track of the long press
				if(evt.touches.length == 1){

          $scope.longPress = true;

  				// We'll set a timeout for 600 ms for a long press
  				$timeout(function() {
  					if ($scope.longPress) {
  						// If the touchend event hasn't fired,
  						// apply the function given in on the element's on-long-press attribute
							triggerEvent();
  					}
  				}, 600);
        }

			});

      $elm.bind('touchmove', function(evt) {
        // Prevent the onLongPress event from firing
				$scope.longPress = false;
				// If there is an on-touch-end function attached to this element, apply it
				if ($attrs.onTouchEnd) {
					$scope.$apply(function() {
						$scope.$eval($attrs.onTouchMove)
					});
				}
      });

			$elm.bind('touchend', function(evt) {
				// Prevent the onLongPress event from firing
				$scope.longPress = false;
				// If there is an on-touch-end function attached to this element, apply it
				if ($attrs.onTouchEnd) {
					$scope.$apply(function() {
						$scope.$eval($attrs.onTouchEnd)
					});
				}
			});
		}
	};
})
