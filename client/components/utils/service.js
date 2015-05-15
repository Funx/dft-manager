// scripts/services/todos.js
angular.module('utils.service', [])

// super simple service
// each function returns a promise object
.factory('Utils', [function() {
  return {
    arrayObjectIndexOf: function(array, searchTerm, property) {
      for(var i = 0, len = array.length; i < len; i++) {
          if (array[i][property] === searchTerm) return i;
      }
      return -1;
    }
  }
}]);
