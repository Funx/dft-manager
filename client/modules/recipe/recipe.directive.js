angular.module('recipe.directive', [
])

.directive('recipe', [
  'Utils'
  ,'Items'
  ,'Families'
  ,function recipeDirective (Utils, Items){
  return {
    restrict: "AE"
    ,priority: 0
    ,scope: {
      model: '='
    }
    ,templateUrl: '/modules/recipe/recipe.html'
    ,link: function ($scope, $element, $attributes, $ctrls) {
      $scope.model = $scope.model || [];

      $scope.ingredients = $scope.model

      $scope.$watch(function () {
        $scope.model = $scope.model || []
        return $scope.model.length
      }, function () {
        $scope.model.map(function (dosage) {
          if (!dosage._ingredient) return null
          else {
            dosage._ingredient.category = dosage._ingredient.category || ''
            dosage._ingredient.className = dosage._ingredient.category.toSlug()
            return dosage
          }
        })
      });

      $scope.removeIngredient = function(index){
        $scope.model.splice(index, 1)
        $scope.$emit('change')
      }
    }
  }
}])
