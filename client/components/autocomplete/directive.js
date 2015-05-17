angular.module('autocomplete.directive', [])

.directive('autoComplete', ['$http', '$timeout', 'Utils', function($http, $timeout, Utils) {
  return {
    restrict: 'AE',
    $scope: {
      ngModel: '=',
      suggestions: '='
    },
    templateUrl: '/components/autocomplete/template.html',
    link: function($scope, elem, attrs) {
      $scope.suggestions = [];
      $scope.selectedIndex = -1;
      $scope.placeHolder = attrs.placeholder || 'Start typing';

      $scope.search = function() {
        if($scope.searchText){
          $http.get(attrs.url + '/' + $scope.searchText)
          .success(function(data) {
            if (Utils.arrayObjectIndexOf(data, $scope.searchText, 'name') === -1) {
              data.unshift({name: $scope.searchText});
            }
            $scope.suggestions = data || [];
            $scope.selectedIndex = -1;
          });
        } else {
          $scope.selectedIndex = -1;
          $scope.suggestions = [];
        }
      }

      $scope.checkKeyDown = function(event) {
        if (event.keyCode === 40) { //down key, increment selectedIndex
          event.preventDefault();
          if ($scope.selectedIndex + 1 !== $scope.suggestions.length) {
            $scope.selectedIndex++;
          }
        } else if (event.keyCode === 38) { //up key, decrement selectedIndex
          event.preventDefault();
          if ($scope.selectedIndex - 1 !== -1) {
            $scope.selectedIndex--;
          }
        } else if (event.keyCode === 13) { //enter pressed
          if($scope.searchText){
            event.preventDefault();
          }
          $scope.addToModel($scope.selectedIndex);
        }
      }

      $scope.addToModel=function(index){
        console.log(index);
        if($scope.ingredients.indexOf($scope.suggestions[index])===-1){
          if(index === -1) index = 0;
          $scope.ingredients.push($scope.suggestions[index]);
          console.log('ici',$scope.suggestions, index);
          $scope.searchText='';
          $scope.suggestions=[];
        }
      }

      $scope.print = function(variable){
        console.log("hého", variable);
      }

      $scope.$watch('selectedIndex',function(val){
        if(val > -1 && val < $scope.suggestions.length) {
          $scope.searchText = $scope.suggestions[$scope.selectedIndex].name;
        }
      });

      elem.find('input').bind('blur', function() {
        $timeout(function(){
          $scope.suggestions = [];
          $scope.searchText = '';
        }, 200);
      });

      $scope.removeTag=function(index){
        $scope.ingredients.splice(index,1);
      }

    }
  }
}]);
