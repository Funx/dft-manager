angular.module('recipe.directive', [
])

.directive('recipe', ['Utils', 'Items', function(Utils, Items){
  return {
    restrict: "AE",
    priority: 0,
    scope: {
      model: '='
    },
    templateUrl: '/components/recipe/template.html',
    link: function($scope, $element, $attributes, $ctrls){
      $scope.recipe = [];
      $scope.model = $scope.model || [];

      $scope.ingredients = $scope.recipe.map(function(dosage){
        return dosage._ingredient;
      });

      $scope.$watch(function(){return $scope.ingredients.length}, function(){
        $scope.ingredients.map(function(ingredient){
          $scope.model.push({
            quantity: 1,
            _ingredient: ingredient
          });
          // if(!ingredient._id && !ingredient.saved){
          //   Items.create(ingredient, function(item){
          //     $scope.model.push({
          //       quantity: 1,
          //       _ingredient: item
          //     });
          //   });
          //   ingredient.saved = true;
          // }else if(!ingredient.saved &&
          //   Utils.arrayObjectIndexOf($scope.recipe, ingredient._id, '_ingredient._id') === -1){
          //   $scope.model.push({
          //     quantity: 1,
          //     _ingredient: ingredient
          //   });
          //   ingredient.saved = true;
          // }else{
          // }
        })

      });

      $scope.removeIngredient = function(index){
        console.log(index);
        $scope.model.splice(index,1);
      }
    }
  }
}])
