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
      todoData.recipe = todoData.recipe || [];
      console.log(todoData.recipe);
      $http.post('/api/items', todoData)
      .success(function(data){
        $this.list = data.list;
        $this.lastEdit = data.lastEdit;
        console.log(data);
        if(done) return done(data.lastEdit);
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
        console.log(data);
        if(!done) done = function(){}
        return done(data);
      })

      .error(function(data) {
        console.log('Error: ' + data);
        if(!done) done = function(){}
        return done(data);
      });

    },

    init: function(done){
      $this = this;

      $http.get('/api/items')

      .success(function(data) {
        $this.list = data;
        console.log(data);
        // $this.list.map(function(item){
        //   $this.delete(item._id);
        // });
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
