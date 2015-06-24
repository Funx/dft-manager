angular.module('fullSet.controller', [])

.controller('FullSetCtrl', [
  '$controller',
  function($controller){
    angular.extend(this, $controller('DeckCtrl',{$scope: this}));
    console.log(this);
  }
])
