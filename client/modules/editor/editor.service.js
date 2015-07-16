// js/controllers/main.js

angular.module('editor.service', [])

.factory('Editor', [
   '$resource'
  ,function Editor ($resource) {
    return $resource('/api/items', {}, {
      save: { method: 'POST' }
    })
  }
])
