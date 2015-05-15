angular.module('autocomplete.directive', [])

.directive('autoComplete', ['$http', 'Utils', function($http, Utils) {
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
        $http.get(attrs.url + '/' + $scope.searchText).success(function(data) {
          if (Utils.arrayObjectIndexOf(data, $scope.searchText, 'name') === -1) {
            data.unshift({name: $scope.searchText});
          }
          $scope.suggestions = data;
          $scope.selectedIndex = -1;
        });
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
          $scope.addTomodel($scope.selectedIndex);
        }
      }

      $scope.addTomodel=function(index){
        if($scope.ingredients.indexOf($scope.suggestions[index])===-1){
          $scope.ingredients.push($scope.suggestions[index]);
          $scope.searchText='';
          $scope.suggestions=[];
        }
      }

      $scope.$watch('selectedIndex',function(val){
        if(val > -1 && val < $scope.suggestions.length) {
          $scope.searchText = $scope.suggestions[$scope.selectedIndex].name;
        }
      });

      $scope.removeTag=function(index){
        $scope.ingredients.splice(index,1);
      }

    }
  }
}]);
