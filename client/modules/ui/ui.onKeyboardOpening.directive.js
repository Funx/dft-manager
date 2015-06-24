angular.module('ui.onKeyboardOpening.directive', [
  'utils.liveEventBinding.service'
])

.directive('watchKeyboardOpening', [
  '$timeout',
  '$debounce',
  function($timeout, $debounce) {
    return {
      restrict: 'A',
      controller: function($scope) {
        var height_old, height_new;
        var focus = false;
        var waiting = false;
        var self = this;
        self.keyBoardOpened = false;

        document.body.addEventListener('focus', function(){
          var focus = true;
          if(!waiting){
            height_old = window.innerHeight;
          }
          window.addEventListener('resize', ifResize);
        }, true);

        document.body.addEventListener('blur', function(){
          focus = false;
          waiting = true;
          $timeout(function(){
            waiting = false;
            if(!focus){
              $scope.$apply(function(){
                self.keyBoardOpened = false;
              });
              window.removeEventListener('resize', ifResize);
            }
          },500);
        }, true);

        function ifResize() {
          $debounce(function(){
            height_new = window.innerHeight;
            var diff = Math.round(height_old - height_new);
            var ratio = Math.round((diff / height_old) * 100);
            if(ratio > 20){
              $scope.$apply(function(){
                self.keyBoardOpened = true;
              });
            }else{
              $scope.$apply(function(){
                self.keyBoardOpened = false;
              });
            }
          }, 50);
        }
      }
    }
  }
])

.directive('onKeyboardOpening', [

  function() {
  return {
    restrict: 'A',
    require: '^watchKeyboardOpening',
    link: function($scope, $elem, $attrs, keyboardWatcher) {
      $scope.$watch(function(){
        return keyboardWatcher.keyBoardOpened;
      },function(){
        if(keyboardWatcher.keyBoardOpened){
          $scope.$eval($attrs.onKeyboardOpening);
        }
      });
    }
  }
}])

.directive('onKeyboardClosing', [

  function() {
  return {
    restrict: 'A',
    require: '^watchKeyboardOpening',
    link: function($scope, $elem, $attrs, keyboardWatcher) {
      $scope.$watch(function(){
        return keyboardWatcher.keyBoardOpened;
      },function(){
        if(!keyboardWatcher.keyBoardOpened){
          $scope.$eval($attrs.onKeyboardClosing);
        }
      });
    }
  }
}]);
