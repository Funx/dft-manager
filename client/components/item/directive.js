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
      // $scope.model.recipe = $scope.model.recipe || [];

      $scope.item = {
        delete: function(){
          Items.delete($scope.model._id);
          console.log($scope.model._id);
        },
        edit: function(){
          Edit.setCurrentItem($scope.model);
          $scope.model = Edit.currentItem;
          console.log('lol');

        },
        save: function(required){
          if($scope.model.name){
            console.log('save')
            Items.create($scope.model, function(data){
              $scope.model._id = data.lastEdit._id;
            });
          }
        }
      }

      $scope.$on('editNewItem', function(){
        if(Edit.currentItem != $scope.model){
          $scope.status = 'pending';
        }else{
          $scope.status = 'editing';
        }
      });

    }
  }
}])
