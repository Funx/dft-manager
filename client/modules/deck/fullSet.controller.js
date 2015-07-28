angular.module('fullSet.controller', [])

.controller('FullSetCtrl', [
  '$scope',
  '$controller',
  function($scope, $controller){
    angular.extend(this, $controller('DeckCtrl',{$scope: $scope}))
    console.log(this)
  }
])
