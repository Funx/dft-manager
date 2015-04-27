// scripts/services/todos.js
angular.module('itemsList.ctrl', [])

// super simple service
// each function returns a promise object
.factory('Items', ['$http',function($http) {
  return {
    get: function() {
      return $http.get('/api/items');
    },
    create: function(todoData) {
      return $http.post('/api/items', todoData);
    },
    delete: function(id) {
      return $http.delete('/api/items/' + id);
    }
  }
}]);
