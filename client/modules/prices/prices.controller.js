angular.module('prices.controller', [])

.controller('PricesCtrl', [
  '$scope',
  '$timeout',
  'Items',
  'Query',
  function($scope,$timeout, Items, Query){
    $scope.$watch(
      function(){return Items.list.length},
      function(){
        $timeout(function(){
          $scope.items = Items.list;
      });
    });

    $scope.$watch(
      function(){
        return Query.value;
      },
      function(){
        $scope.filter = Query.value;
      }
    );

    $scope.saveItem = function(itemId){
      Items.create($scope.items[itemId], function(data){});
    }

    $scope.deleteItem = function(itemId){
      Items.delete($scope.items[itemId]._id);
    }

    $scope.focusNext = function(prevId){
      if(prevId + 1 < $scope.items.length){
        $scope.items.map(function(item){
          item.selected = false;
        })
        $scope.items[prevId + 1].selected = true;
      }
    }

    // when landing on the page, get all Items and show them
    Items.init();
  }
]);
