// scripts/services/todos.js
angular.module('itemEditor.service', [])

// super simple service
// each function returns a promise object
.factory('Edit', ['$rootScope', function($rootScope) {
  return{
    setCurrentItem: function(model){
      this.currentItem = model;
      $rootScope.$broadcast('editNewItem');
    },
    currentItem: {}
  }
}])
