angular.module('ui.mouseTracking.directive', [
  'ui.mouse.service'
])

.directive('uiMouseTracking', [
  'Mouse',
  function(Mouse){
    return {
      restrict: 'A',
      link: function(){
        document.body.onmousemove = function(event){
          Mouse.update(event);
        }
      }
    };
  }
]);
