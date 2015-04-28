// scripts/services/todos.js
angular.module('itemsList.service', [])

// super simple service
// each function returns a promise object
.factory('Items', ['$http','$rootScope', function($http, $rootScope) {

  return {

    get: function() {
      return $http.get('/api/items');
    },

    create: function(todoData) {
      $this = this;
      $http.post('/api/items', todoData)
      .success(function(data){
        $this.list = data;
        $rootScope.$broadcast('itemsListUpdated');
        return data;
      })

      .error(function(data) {
        console.log('Error: ' + data);
      });

    },

    delete: function(id) {
      $this = this;

      $http.delete('/api/items/' + id)

      .success(function(data){
        $this.list = data;
        $rootScope.$broadcast('itemsListUpdated');
        return data;
      })

      .error(function(data) {
        console.log('Error: ' + data);
      });

    },

    init: function(){
      $this = this;

      $this.get()

      .success(function(data) {
        $this.list = data;
        $rootScope.$broadcast('itemsListUpdated');
        return data;
      })

      .error(function(data) {
        console.log('Error: ' + data);
      });

    },
    list: []
  }
}]);
