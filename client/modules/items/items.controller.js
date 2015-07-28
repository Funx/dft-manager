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

  var orderBy = $filter('orderBy')
  var filterBy = $filter('filter')

  $scope.filter = ''

  var filters = (array) => {
    array = orderBy(array, 'modified', true)
    // array = filterBy(array, $scope.filter)
    return array
  }

  $scope.$watch(
    () => {
      return Query.value
    },
    () => {
      $scope.filter = Query.value
    }
  )

  $scope.$watch(
    () => {return Items.list.length},
    () => {
      $timeout(() => {
        $scope.items = filters(Items.list)
      })
  })

  // when landing on the page, get all Items and show them
  if(!Items.list.length){Items.init()}

}])
