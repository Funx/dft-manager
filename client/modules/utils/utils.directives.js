angular.module('utils.directives', [])

.directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('click', function (e) {
                e.stopPropagation();
            });
        }
    };
 })

 .directive('focusMe', function($timeout, $parse) {
   return {
     //scope: true,   // optionally create a child scope
     link: function(scope, element, attrs) {
       var model = $parse(attrs.focusMe);
       scope.$watch(model, function(value) {
         if(value) {
           $timeout(function() {
             element[0].focus();
           });
         }
       });
      //  // to address @blesh's comment, set attribute value to 'false'
      //  // on blur event:
      //  element.bind('blur', function() {
      //     scope.$apply(model.assign(scope, false));
      //  });
     }
   };
 })

 // Post repeat directive for logging the rendering time
.directive('postRepeatDirective',
  ['$timeout', '$log',  'TimeTracker',
  function($timeout, $log, TimeTracker) {
    return function(scope, element, attrs) {
      if (scope.$last){
         $timeout(function(){
             var timeFinishedLoadingList = TimeTracker.reviewListLoaded();
             var ref = new Date(timeFinishedLoadingList);
             var end = new Date();
             $log.debug("## DOM rendering list took: " + (end - ref) + " ms");
         });
       }
    };
  }
])

// Add this directive where you keep your directives
.directive('onLongPress', function($timeout) {
	return {
		restrict: 'A',
		link: function($scope, $elm, $attrs) {
			$elm.bind('touchstart', function(evt) {
				// Locally scoped variable that will keep track of the long press
				if(evt.touches.length == 1){

          $scope.longPress = true;

  				// We'll set a timeout for 600 ms for a long press
  				$timeout(function() {
  					if ($scope.longPress) {
  						// If the touchend event hasn't fired,
  						// apply the function given in on the element's on-long-press attribute
  						$scope.$apply(function() {
  							$scope.$eval($attrs.onLongPress)
  						});
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
						$scope.$eval($attrs.onTouchEnd)
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

      document.oncontextmenu = function (e) {
         if(e.target.hasAttribute('on-long-press')) {
             return false;
         }
      };

      $elm.bind('contextmenu',function(e){
        $scope.$apply(function() {
          $scope.$eval($attrs.onLongPress)
        });
      }) ;
		}
	};
})

.directive('rightClick',function(){

});
