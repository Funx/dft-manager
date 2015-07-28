// scripts/services/todos.js
angular.module('utils.services', [])

// super simple service
// each function returns a promise object
.factory('Utils', [() => {
  return {
    arrayObjectIndexOf: (array, searchTerm, property) => {
      property = property.split('.')
      for(var i = 0, len = array.length; i < len; i++) {
        var value = array[i]
        property.map((prop) => {
          value = value[prop]
        })

        if (value && searchTerm && value.toString().toLowerCase() === searchTerm.toString().toLowerCase()) return i
      }
      return -1
    },
    deepValue: (obj, deepKey) => {
        // get deep value in case of a param key like : item.deep.value
        var deepKeys = deepKey.split('.')
        var objValue = obj
        deepKeys.forEach((key) => {
          objValue = objValue ? objValue[key] : ''
        })
        return objValue
    }
  }

}])
