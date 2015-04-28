// scripts/services/todos.js
angular.module('item.service', [
  'itemsList.service'
])

// super simple service
// each function returns a promise object
.factory('Item', ['$http', 'Items', function($http, Items) {
  return {
    get: Items.get(),
    create: Items.create(data),
    delete: Items.delete(id)
  }
}]);
