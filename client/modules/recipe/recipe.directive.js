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
      $scope.model = $scope.model || []

      $scope.ingredients = $scope.model

      $scope.$watch(() => {
        $scope.model = $scope.model || []
        return $scope.model.length
      }, () => {
        $scope.model.map((dosage) => {
          if (!dosage._ingredient) return null
          else {
            dosage._ingredient.category = dosage._ingredient.category || ''
            dosage._ingredient.className = dosage._ingredient.category.toSlug()
            return dosage
          }
        })
      })

      $scope.removeIngredient = (index) => {
        $scope.model.splice(index, 1)
        $scope.$emit('change')
      }
    }
  }
}])
