// js/controllers/main.js

angular.module('itemsList.component', [
  'itemsList.service',
  'item.directive'
])

.controller('ItemsListCtrl', ['$scope', 'Items', function($scope, Items) {
  $scope.items = Items.list;
  $scope.itemHeight = 160;
  $scope.$on('itemsListUpdated', function(){
    $scope.items = Items.list;
    console.log('itemsListUpdated');
    console.log(Items.list);
  });

  // when landing on the page, get all Items and show them
  Items.init();

}]);
