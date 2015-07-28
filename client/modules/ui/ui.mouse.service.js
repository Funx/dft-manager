angular.module('ui.mouse.service', [])
.factory('Mouse', () => {
  var onClientLocation = null
  var onScreenLocation = null
  var onPageLocation = null
  var previousLocation = null
  var movement = null

  // Public API for this service.
  return {
    getOnClientLocation: () => {
      return angular.copy(onClientLocation)
    },

    getOnScreenLocation: () => {
      return angular.copy(onClientLocation)
    },

    getOnPageLocation: () => {
      return angular.copy(onPageLocation)
    },

    getMovement: () => {
      return angular.copy(movement)
    },
    // I set the new location.
    update: (event) => {
      // Overwrite with the new location.
      onClientLocation = {
        x: event.clientX,
        y: event.clientY
      }
      onScreenLocation = {
        x: event.screenX,
        y: event.screenY
      }
      onPageLocation = {
        x: event.pageX,
        y: event.pageY
      }
      movement = {
        x: event.movementX,
        y: event.movementY
      }
    }
  }
})
