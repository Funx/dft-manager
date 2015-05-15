angular.module('recipe.directive', [
])

.directive('recipe', ['Utils', function(Utils){
  return {
    restrict: "AE",
    priority: 0,
    scope: {
      recipe: '='
    },
    templateUrl: '/components/recipe/template.html',
    link: function($scope, $element, $attributes, $ctrls){
      $scope.recipe = [{
        quantity: 10,
        _ingredient: {name: 'Caca'}
      }];
      $scope.ingredients = $scope.recipe.map(function(dosage){
        return dosage._ingredient;
      });

      $scope.$watch(function(){return $scope.ingredients.length}, function(){
        $scope.ingredients.map(function(ingredient){
          if(!ingredient._id){
            console.log("create new item and save :", ingredient);
          }else if(Utils.arrayObjectIndexOf($scope.recipe, ingredient._id, '_ingredient._id') === -1){
            console.log("save item :", ingredient);
          }else{
            console.log('prout déjà dedans');
            console.log(ingredient);
          }
        })

      });
    }
  }
}])
