angular.module('item.service', [])

// super simple service
// each function returns a promise object
.factory('Item', [
    '$resource'
  , function($resource, $rootScope) {
      return $resource('/item', {}, {
        remove: {
            method: 'DELETE'
        }
      })
    }
])
