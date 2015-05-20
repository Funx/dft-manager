// js/controllers/main.js

angular.module('itemEditor.component', [
  'itemsList.service',
  'itemEditor.service',
  'item.directive',
  'autocomplete.directive'
])

.controller('ItemEditorCtrl', ['$scope', '$timeout', 'Items', 'Edit', function($scope, $timeout, Items, Edit) {
  $scope.newItem = {};
  $scope.placeHolder = {
    name: "Nom de l'objet",
    type: "Type d'objet",
    category: "Catégorie",
    ingredient: {
      name: "Ingrédients",
      quantity: "1"
    },
  };

  $scope.hello = "yo";
  $scope.focus = 'name';


    // when submitting the add form, send the text to the node API
  $scope.createItem = function() {
    console.log("hey");
    console.log($scope.newItem);
    if($scope.newItem.name){
      newItem = $scope.newItem
      Items.create(newItem);
      $scope.newItem = {
        category: newItem.category,
        type: newItem.type
      }; // clear the form so our user is ready to enter another
      $scope.focus = 'false';
      $timeout(function(){
        $scope.focus = 'name';
      })
    }
  };

  $scope.addIngredient = function(){
    item = $scope.newItem;
    newIngredient = item.newIngredient
    if(newIngredient && newIngredient.name){
      newIngredient.quantity = newIngredient.quantity || 1;
      if(!item.recipe) item.recipe = [];
      item.recipe.map(function(ingredient){
        if(ingredient.name === newIngredient.name){
          ingredient = newIngredient;
          newIngredient = false;
        }
      });
      if(newIngredient) item.recipe.push(newIngredient);
      newIngredient = {};
      console.log(newIngredient);
      console.log(item.recipe);
      $scope.newItem.newIngredient = {};
    }
  }

  $scope.print = function(variable){
    console.log(variable);
  }

  // delete a Item after checking it
  $scope.deleteItem = function(id,index) {
    Items.delete(id)
      // if successful creation, call our get function to get all the new Items
      .success(function(data) {
        $scope.items = data;
        //notifySuccess; then realy delete item in front
      });
  };

}]);
