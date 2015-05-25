// js/controllers/main.js

angular.module('itemsList.component', [
  'itemsList.service',
  'item.directive'
])

.controller('ItemsListCtrl', [
  '$scope',
  '$timeout',
  '$filter',
  'Items', function($scope, $timeout, $filter, Items) {

  var orderBy = $filter('orderBy');
  var filterBy = $filter('filter');

  $scope.filter = 'acro';

  var filters = function(array){
    array = orderBy(array, 'modified', true);
    array = filterBy(array, $scope.filter);
    return array;
  }

  $scope.filterItems = function(){
    $scope.items = filters(Items.list);
  }

  $scope.$watch(
    function(){return Items.list.length},
    function(){
      $timeout(function(){
        $scope.items = filters(Items.list);
      });
  });

  // when landing on the page, get all Items and show them
  Items.init();

}]);
