angular.module('autocomplete.directive', [])

.directive('autoComplete', ['$http', function($http) {
  return {
    restrict: 'AE',
    $scope: {
      selectedTags: '=model',
      suggestions: '='
    },
    templateUrl: '/components/autocomplete/template.html',
    link: function($scope, elem, attrs) {
      $scope.suggestions = [];
      $scope.selectedTags = [];
      $scope.selectedIndex = -1;

      $scope.search = function() {
        $http.get(attrs.url + '/' + $scope.searchText).success(function(data) {
          if (data.indexOf($scope.searchText) === -1) {
            data.unshift($scope.searchText);
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
          $scope.addToSelectedTags($scope.selectedIndex);
        }
      }

      $scope.addToSelectedTags=function(index){
        if($scope.selectedTags.indexOf($scope.suggestions[index])===-1){
          $scope.selectedTags.push($scope.suggestions[index]);
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
        $scope.selectedTags.splice(index,1);
      }

    }
  }
}]);
