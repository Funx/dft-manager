angular.module('utils.directives', [])

.directive('stopEvent', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      element.bind('click', function(e) {
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
        if (value) {
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

.directive('selectOnFocus', [
  '$timeout',
  function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('focus', function() {
        self = this;
        if (!window.getSelection().toString() && self.value) {
          console.log('value :',self.value)
          // Required for mobile Safari
          $timeout(function(){
            self.setSelectionRange(0, self.value.length)
          }, 100)
        }
      });
      element.bind('click', function() {
        if (!window.getSelection().toString() && self.value) {
          // Required for mobile Safari
          self.setSelectionRange(0, self.value.length)
        }
      });
    }
  };
}])

// Post repeat directive for logging the rendering time
.directive('postRepeatDirective', ['$timeout', '$log', 'TimeTracker',
  function($timeout, $log, TimeTracker) {
    return function(scope, element, attrs) {
      if (scope.$last) {
        $timeout(function() {
          var timeFinishedLoadingList = TimeTracker.reviewListLoaded();
          var ref = new Date(timeFinishedLoadingList);
          var end = new Date();
          $log.debug("## DOM rendering list took: " + (end - ref) + " ms");
        });
      }
    };
  }
])

.directive('rightClick', function() {

});
