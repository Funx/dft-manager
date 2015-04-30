// scripts/services/todos.js
angular.module('itemsList.service', [])

// super simple service
// each function returns a promise object
.factory('Items', ['$http','$rootScope', function($http, $rootScope) {

  return {

    get: function() {
      return $http.get('/api/items');
    },

    create: function(todoData, done) {
      $this = this;
      $http.post('/api/items', todoData)
      .success(function(data){
        $this.list = data.list;
        $this.lastEdit = data.lastEdit;
        $rootScope.$broadcast('itemsListUpdated');
        if(done) return done(data);
      })

      .error(function(data) {
        console.log('Error: ' + data);
        if(done) return done(data);
      });

    },

    delete: function(id, done) {
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

    init: function(done){
      $this = this;

      $this.get()

      .success(function(data) {
        $this.list = data;
        $rootScope.$broadcast('itemsListUpdated');
        console.log(data);

        return data;
      })

      .error(function(data) {
        console.log('Error: ' + data);
      });

    },
    list: [],
    lastEdit: {}
  }
}]);
