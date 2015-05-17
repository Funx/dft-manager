// js/controllers/main.js

angular.module('itemsList.component', [
  'itemsList.service',
  'item.directive'
])

.controller('ItemsListCtrl', ['$scope', '$timeout', 'Items', function($scope, $timeout, Items) {
  $scope.items = Items.list;
  $scope.itemHeight = 160;

  $scope.$watch(function(){return Items.list.length}, function(){
    $timeout(function(){
      $scope.items = Items.list;
    },500);
  });

  // when landing on the page, get all Items and show them
  Items.init();

}]);
