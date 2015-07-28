angular.module('prices.controller', [])

.controller('PricesCtrl', [
  '$scope',
  '$timeout',
  'Items',
  'Query',
  function($scope,$timeout, Items, Query){
    $scope.$watch(
      () => {return Items.list.length},
      () => {
        $timeout(() => {
          $scope.items = Items.list
      })
    })

    $scope.$watch(
      () => {
        return Query.value
      },
      () => {
        $scope.filter = Query.value
      }
    )

    $scope.saveItem = (itemId) => {
      Items.create($scope.items[itemId], (data) => {})
    }

    $scope.deleteItem = (itemId) => {
      Items.delete($scope.items[itemId]._id)
    }

    $scope.focusNext = (prevId) => {
      if(prevId + 1 < $scope.items.length){
        $scope.items.map((item) => {
          item.selected = false
        })
        $scope.items[prevId + 1].selected = true
      }
    }

    // when landing on the page, get all Items and show them
    if(!Items.list.length){Items.init()}

  }
])
