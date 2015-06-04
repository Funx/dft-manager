// js/controllers/main.js

angular.module('editor.controller', [
])

.controller('EditorCtrl', [
  '$scope',
  '$timeout',
  '$http',
  'Utils',
  'Items', function($scope, $timeout, $http, Utils, Items, Edit) {
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
    if($scope.newItem.name && $scope.newItem.category && !$scope.newItem.recipe.length){
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
          if(data){
            $scope.newItem.recipe = [];
            $scope.newItem.recipe.push({
              _ingredient: data,
              quantity: 1
            });

            var indexOfMetaObject = Utils.arrayObjectIndexOf(data.recipe, 'Méta', '_ingredient.category');
            if(indexOfMetaObject > -1) {
              var ingredientName = data.recipe[indexOfMetaObject]._ingredient.name.replace(/moyen/gi, 'majeur').replace(/mineur/gi, 'moyen');
              var data = {name: ingredientName};
              $scope.newItem.recipe.push({
                _ingredient: data,
                quantity: 1
              });
            }
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
