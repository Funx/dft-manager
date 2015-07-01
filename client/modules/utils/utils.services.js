// scripts/services/todos.js
angular.module('utils.services', [])

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

        if (value && searchTerm && value.toString().toLowerCase() === searchTerm.toString().toLowerCase()) return i;
      }
      return -1;
    },
    deepValue: function(obj, deepKey){
        // get deep value in case of a param key like : item.deep.value
        var deepKeys = deepKey.split('.');
        var objValue = obj;
        deepKeys.forEach(function(key){
          objValue = objValue ? objValue[key] : '';
        });
        return objValue;
    }
  }

}])
