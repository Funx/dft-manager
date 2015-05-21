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

      $scope.ingredients = $scope.model

      $scope.$watch(function(){return $scope.model.length}, function(){
        $scope.model.map(function(dosage){
          if(!dosage._ingredient) {dosage = null;}
          else {
            dosage._ingredient.category = dosage._ingredient.category || '';
            dosage._ingredient.className = dosage._ingredient.category.toSlug();
          }
        })
      });


      // $scope.$watch(function(){return $scope.ingredients.length}, function(){
      //   $scope.model = $scope.model || [];
      //   console.log('=watch ingredients.length', $scope.model);
      //   $scope.ingredients.map(function(dosage){
      //     if(!dosage._ingredient._id && !dosage._ingredient.saved){
      //       // Items.create(dosage._ingredient, function(item){
      //       //   dosage = item;
      //       // });
      //       dosage._ingredient.saved = true;
      //       console.log('create ingredient');
      //     }else if(!dosage._ingredient.saved &&
      //       Utils.arrayObjectIndexOf($scope.model, dosage._ingredient._id, '_ingredient._id') === -1){
      //         dosage._ingredient.saved = true;
      //       console.log('save existing ingredient');
      //     }else{
      //       console.log('do nothing');
      //     }
      //   });
      //
      // });

      $scope.removeIngredient = function(index){
        $scope.model.splice(index,1);
        $scope.$emit('change');
      }
    }
  }
}])
