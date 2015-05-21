// js/controllers/main.js

angular.module('itemEditor.component', [
  'itemsList.service',
  'itemEditor.service',
  'item.directive',
  'autocomplete.directive'
])

.controller('ItemEditorCtrl', ['$scope', '$timeout', '$http', 'Utils', 'Items', 'Edit', function($scope, $timeout, $http, Utils, Items, Edit) {
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

  $scope.addChildIngredient = function(){
    if($scope.newItem.name && $scope.newItem.category){
      switch ($scope.newItem.category.toSlug()){
        case 'trophee-moyen':
          query = 'Trophée mineur/';
          break;
        case 'trophee-majeur':
          query = 'Trophée moyen/';
          break;
        default :
          query = false;
      }
      if(query){
        searchTerm = $scope.newItem.name.replace(/moyen/gi, '').replace(/majeur/gi, '');

        query += searchTerm;

        $http.get('/api/search/items/' + query)
        .success(function(data){
          $scope.newItem.recipe.push({
            quantity: 1,
            _ingredient: data
          });

          indexOfMetaObject = Utils.arrayObjectIndexOf(data.recipe, 'Méta', '_ingredient.category');
          console.log(data.recipe);
          if(indexOfMetaObject > -1) {
            ingredientName = data.recipe[indexOfMetaObject]._ingredient.name.replace(/moyen/gi, 'majeur').replace(/mineur/gi, 'moyen');
            console.log(ingredientName);
            $scope.newItem.recipe.push({
              quantity: 1,
              _ingredient: {name: ingredientName}
            })
          }

        });
      }

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
