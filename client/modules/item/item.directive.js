angular.module('item.directive', [])

.directive('item', ['Items', (Items) => {
  return {
    restrict: "AE",
    priority: 0,
    scope: {
      model: '=',
      status: '@'
    },
    templateUrl: '/modules/item/item.html',
    link: function($scope, $element, $attributes, $ctrls){
      $scope.model= $scope.model || {}

      $scope.model.category = $scope.model.category || ''

      $scope.$on('change', () => {
        $scope.item.save()
      })

      $scope.selectItem = () => {
        $scope.item.selected = true
        console.log('select')
      }

      $scope.openContextMenu = () => {
        $scope.selectItem()
        $scope.displayContextMenu = true
      }

      $element.bind('click', (event) => {
        if($scope.item.selected){
          event.stopPropagation()
          console.log('stop !')
        }
      })

      document.body.addEventListener('click', (event) => {
        if($scope.item.selected){
          $scope.$apply(() => {
            $scope.item.selected = false
          })
        }
      })

      $scope.item = {
        delete: () => {
          Items.delete($scope.model._id)
        },
        edit: () => {
          Edit.setCurrentItem($scope.model)
          $scope.model = Edit.currentItem
        },
        save: () => {
          if($scope.model.name){
            Items.create($scope.model, (data) => {})
          }
        }
      }
    },
    controller: function($scope){
      $scope.yo = "yooo" + Math.floor(Math.random()*100)

      $scope.hideActionSheet = () => {
        $scope.isActionSheetVisible = false
      }

      $scope.showActionSheet = () => {
        $scope.isActionSheetVisible = true
      }

      $scope.isVisible = () => {
        var filter = $scope.filter || ''
        var name = $scope.name || ''
        var isSubstring = ( name.indexOf( filter ) !== -1 )
        // If the filter value is not a substring of the
        // name, we have to exclude it from view.
        return isSubstring || !filter
      }
    }
  }
}])
