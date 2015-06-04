angular.module('ui.mouse.service', [])
.factory('Mouse', function() {
  var onClientLocation = null;
  var onScreenLocation = null;
  var onPageLocation = null;
  var previousLocation = null;
  var movement = null;

  // Public API for this service.
  return {
    getOnClientLocation: function() {
      return angular.copy(onClientLocation);
    },

    getOnScreenLocation: function(){
      return angular.copy(onClientLocation);
    },

    getOnPageLocation: function(){
      return angular.copy(onPageLocation);
    },

    getMovement: function(){
      return angular.copy(movement);
    },
    // I set the new location.
    update: function(event) {
      // Overwrite with the new location.
      onClientLocation = {
        x: event.clientX,
        y: event.clientY
      };
      onScreenLocation = {
        x: event.screenX,
        y: event.screenY
      };
      onPageLocation = {
        x: event.pageX,
        y: event.pageY
      };
      movement = {
        x: event.movementX,
        y: event.movementY
      };
    }
  }
});
