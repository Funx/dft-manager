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
        var self = this;
        self.keyBoardOpened = false;

        document.body.addEventListener('focus', function(){
          var focus = true;
          height_old = window.innerHeight;
          window.addEventListener('resize', ifResize);
        }, true);

        document.body.addEventListener('blur', function(){
          focus = false;
          $timeout(function(){
            if(!focus){
              $scope.$apply(function(){
                self.keyBoardOpened = false;
              });
              window.removeEventListener('resize', ifResize);
            }
          });
        }, true);

        function ifResize() {
          $debounce(function(){
            height_new = window.innerHeight;
            var diff = Math.round(height_old - height_new);
            var ratio = Math.round((diff / height_old) * 100);
            console.log('window resized of :',ratio, '%');
            if(ratio > 20){
              $scope.$apply(function(){
                self.keyBoardOpened = true;
                console.log(self);
                console.log('controller :',self.keyBoardOpened);
              });
            }else{
              $scope.$apply(function(){
                self.keyBoardOpened = false;
                console.log('controller :',self.keyBoardOpened);
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
        console.log('watcher :' , keyboardWatcher);
        return keyboardWatcher.keyBoardOpened;
      },function(){
        console.log(keyboardWatcher.keyBoardOpened);
        if(keyboardWatcher.keyBoardOpened){
          $scope.$eval($attrs.onKeyboardOpening);
          console.log("open keyboard");
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
          console.log("close keyboard");
        }
      });
    }
  }
}]);
