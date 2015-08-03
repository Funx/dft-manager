// js/controllers/main.js

angular.module('editor.service', [])

.factory('Editor', [
   '$resource'
  ,function Editor ($resource) {
    return $resource('/item', {}, {
      save: { method: 'POST' }
    })
  }
])
