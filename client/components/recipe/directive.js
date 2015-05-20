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
      $scope.model = $scope.model || [];
      console.log($scope.model);

      $scope.ingredients = $scope.model

      $scope.$watch(function(){return $scope.ingredients.length}, function(){
        $scope.model = $scope.model || [];
        console.log('=watch ingredients.length', $scope.model);
        $scope.ingredients.map(function(dosage){
          if(!dosage._ingredient._id && !dosage.saved){
            Items.create(dosage._ingredient, function(item){
              dosage = item;
              dosage.saved = true;
            });
            console.log('create ingredient');
          }else if(!dosage.saved &&
            Utils.arrayObjectIndexOf($scope.model, dosage._ingredient._id, '_ingredient._id') === -1){
            dosage.saved = true;
            console.log('save existing ingredient');
          }else{
            console.log('do nothing');
          }
        });

      });

      $scope.removeIngredient = function(index){
        console.log(index);
        $scope.model.splice(index,1);
      }
    }
  }
}])
