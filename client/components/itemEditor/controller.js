// js/controllers/main.js

angular.module('itemEditor.component', [
  'itemsList.service',
  'itemEditor.service',
  'item.directive',
  'autocomplete.directive'
])

.controller('ItemEditorCtrl', ['$scope', '$timeout', 'Items', 'Edit', function($scope, $timeout, Items, Edit) {
  $scope.formData = {};
  $scope.placeHolder = {
    name: "Nom de l'objet",
    type: "Type d'objet",
    category: "Catégorie",
    ingredient: {
      name: "Ingrédients",
      quantity: "1"
    },
  };

  $scope.$on('editNewItem', function(){
    $scope.formData = Edit.currentItem;
  });


  $scope.$watch('formData.name', function(newVal, oldVal){debounceSaveUpdates(newVal, oldVal)});

  var timeout = null;
  var saveInProgress = false;

  var debounceSaveUpdates = function(newVal, oldVal) {
    console.log('event fired');
    if (newVal != oldVal) {

      if (timeout) $timeout.cancel(timeout);
      timeout = $timeout(saveUpdates, 1000);
    }
  };

  var saveUpdates = function(val){
    if($scope.formData.name && !saveInProgress){
      console.log('save')
      saveInProgress = true;
      list = Items.create($scope.formData);
      $scope.formData._id = Ilist[list.length - 1]._id;
      saveInProgress = false;
    }
  }

  // when submitting the add form, send the text to the node API
  $scope.createItem = function() {
    if($scope.formData.name){
      Items.create($scope.formData);
      $scope.formData = {}; // clear the form so our user is ready to enter another
    }
  };

  $scope.addIngredient = function(){
    item = $scope.formData;
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
      $scope.formData.newIngredient = {};
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
