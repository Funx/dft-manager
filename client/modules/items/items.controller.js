// js/controllers/main.js

angular.module('items.controller', [

])

.controller('ItemsCtrl', [
  '$scope',
  '$timeout',
  '$filter',
  '$debounce',
  'Items',
  'Query',
  function($scope, $timeout, $filter, $debounce, Items, Query) {

  var orderBy = $filter('orderBy');
  var filterBy = $filter('filter');

  $scope.filter = '';

  var filters = function(array){
    array = orderBy(array, 'modified', true);
    // array = filterBy(array, $scope.filter);
    return array;
  }

  $scope.$watch(
    function(){
      return Query.value;
    },
    function(){
      $scope.filter = Query.value;
    }
  );

  $scope.$watch(
    function(){return Items.list.length},
    function(){
      $timeout(function(){
        $scope.items = filters(Items.list);
      });
  });

  // when landing on the page, get all Items and show them
  Items.init();

}])
