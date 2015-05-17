// js/controllers/main.js

angular.module('itemsController', [])

.controller('mainController', ['Items', function(Items) {
  $scope = this;
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
  $scope.items = [];

  // when landing on the page, get all Items and show them
  Items.get()
    .success(function(data) {
      $scope.items = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // when submitting the add form, send the text to the node API
  $scope.createItem = function() {
    //var ItemIndex = $scope.Items.push(self.formData);
    // call the create function from our service (returns a promise object)
    Items.create($scope.formData)
      // if successful creation, call our get function to get all the new Items
      .success(function(data) {
        //$scope.Items[ItemIndex - 1]._id = data._id;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
    $scope.formData = {}; // clear the form so our user is ready to enter another

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
