(function() {
  // public/app.js
  var app = angular.module('app', ['ngAnimate']);

  app.controller('mainController', ['$scope', '$http', function($scope, $http) {
    var self = this;
    self.formData = {};
    self.placeHolder = "Nom de l'objet";

    // when landing on the page, get all todos and show them
    $http.get('/api/todos')
      .success(function(data) {
        self.todos = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

    // when submitting the add form, send the text to the node API
    this.createTodo = function() {
      var todoIndex = self.todos.push(self.formData);

      $http.post('/api/todos', self.formData)
        .success(function(data) {
          self.todos[todoIndex-1]._id = data._id;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });

      self.formData = {};
    };

    // delete a todo after checking it
    this.deleteTodo = function(id, index) {
      self.todos.splice(index, 1);
      $http.delete('/api/todos/' + id)
        .success(function(data) {
          //self.todos = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

  }]);

})();
