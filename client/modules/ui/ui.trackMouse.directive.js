angular.module('ui.mouseTracking.directive', [
  'ui.mouse.service'
])

.directive('uiMouseTracking', [
  'Mouse',
  (Mouse) => {
    return {
      restrict: 'A',
      link: () => {
        document.body.onmousemove = (event) => {
          Mouse.update(event)
        }
      }
    }
  }
])
