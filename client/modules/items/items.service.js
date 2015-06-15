// scripts/services/todos.js
angular.module('items.service', [])

// super simple service
// each function returns a promise object
.factory('Items', ['$http','$rootScope', function($http, $rootScope) {

  return {

    get: function() {
      return $http.get('/api/items');
    },

    create: function(itemData, done) {
      $this = this;
      itemData.recipe = itemData.recipe || [];

      $http.post('/api/items', itemData)
      .success(function(data){
        $this.list = data.list.map(function(item){
          item.category = item.category || '';
          item.className = item.category.toSlug();
          return item;
        });
        $this.lastEdit = data.lastEdit;
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
        $this.list = data.map(function(item){
          item.category = item.category || '';
          item.className = item.category.toSlug();
          return item;
        });
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
        $this.list = data.map(function(item){
          // item.category = item.category || '';
          // item.className = item.category.toSlug();
          return item;
        });
        console.log($this.list);
        // $this.list.map(function(item){
        //   $this.delete(item._id);
        // });
        return $this.list;
      })

      .error(function(data) {
        console.log('Error: ' + data);
      });



    },
    list: [],
    lastEdit: {}
  }
}]);
