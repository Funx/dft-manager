angular.module('query.controller', [])

.controller('QueryCtrl', [
  '$scope',
  'Query',
  function($scope, Query){
    $scope.$watch('filterQuery', function(){
      Query.value = $scope.filterQuery
    })
  }
]);
