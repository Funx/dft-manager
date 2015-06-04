angular.module('item.directive', [])

.directive('item', ['Items', function(Items){
  return {
    restrict: "AE",
    priority: 0,
    scope: {
      model: '=',
      status: '@'
    },
    templateUrl: '/modules/item/item.html',
    link: function($scope, $element, $attributes, $ctrls){
      $scope.model= $scope.model || {};

      $scope.model.category = $scope.model.category || '';
      $scope.className = $scope.model.category.toSlug();

      $scope.$on('change', function(){
        $scope.item.save()
      });

      $scope.selectItem = function(){
        $scope.item.selected = true;
        console.log('select');
      }

      $scope.openContextMenu = function(){
        $scope.selectItem();
        $scope.displayContextMenu = true;
      }

      $element.bind('click', function(event){
        if($scope.item.selected){
          event.stopPropagation();
          console.log('stop !');
        }
      });

      document.body.addEventListener('click', function(event){
        if($scope.item.selected){
          $scope.$apply(function(){
            $scope.item.selected = false;
          });
        }
      });

      $scope.item = {
        delete: function(){
          Items.delete($scope.model._id);
        },
        edit: function(){
          Edit.setCurrentItem($scope.model);
          $scope.model = Edit.currentItem;
        },
        save: function(){
          if($scope.model.name){
            Items.create($scope.model, function(data){});
          }
        }
      }
    },
    controller: function($scope){
      $scope.yo = "yooo" + Math.floor(Math.random()*100);

      $scope.hideActionSheet = function() {
        $scope.isActionSheetVisible = false;
      }

      $scope.showActionSheet = function(){
        $scope.isActionSheetVisible = true;
      }

      $scope.isVisible = function(){
        var filter = $scope.filter || '';
        var name = $scope.name || '';
        var isSubstring = ( name.indexOf( filter ) !== -1 );
        // If the filter value is not a substring of the
        // name, we have to exclude it from view.
        return isSubstring || !filter;
      };
    }
  }
}])
