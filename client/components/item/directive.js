angular.module('item.directive', [
  'item.service',
  'itemsList.service',
  'ingredient.directive',
  'recipe.directive',
  'xeditable'
])

.directive('item', ['Items', 'Edit', function(Items, Edit){
  return {
    restrict: "AE",
    priority: 0,
    scope: {
      model: '=',
      status: '@'
    },
    templateUrl: '/components/item/template.html',
    link: function($scope, $element, $attributes, $ctrls){
      $scope.model= $scope.model || {};

      // $scope.$watch(
      //   function(){return $scope.model.recipe.length},
      //   $scope.item.save()
      // )

      $scope.item = {
        delete: function(){
          console.log($scope.model);

          Items.delete($scope.model._id);
        },
        edit: function(){
          Edit.setCurrentItem($scope.model);
          $scope.model = Edit.currentItem;
          console.log('lol');

        },
        save: function(){
          if($scope.model.name){
            console.log('save')
            console.log($scope.model);
            Items.create($scope.model, function(data){});
          }
        }
      }
    }
  }
}])
