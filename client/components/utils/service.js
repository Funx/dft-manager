// scripts/services/todos.js
angular.module('utils.service', [])

// super simple service
// each function returns a promise object
.factory('Utils', [function() {
  return {
    arrayObjectIndexOf: function(array, searchTerm, property) {
      property = property.split('.');
      for(var i = 0, len = array.length; i < len; i++) {
        var value = array[i];
        property.map(function(prop){
          value = value[prop];
        });
        console.log(searchTerm);
        if (value && searchTerm && value.toLowerCase() === searchTerm.toLowerCase()) return i;
      }
      return -1;
    }
  }
}]);
