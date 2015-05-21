angular.module('autocomplete.directive', [])

.directive('autoComplete', ['$http', '$timeout', 'Utils', function($http, $timeout, Utils) {
  return {
    restrict: 'AE',
    $scope: false,
    templateUrl: '/components/autocomplete/template.html',
    link: function($scope, elem, attrs) {
      var validated = false; //flag to know if the user already hit enter for the previous suggestions

      $scope.suggestions = [];
      $scope.selectedIndex = 0;
      $scope.placeHolder = attrs.placeholder || 'Start typing';

      console.log($scope.model);

      $scope.search = function() {
        if($scope.searchText){
          var pattern = /^([0-9])+/gm;
          $scope.quantity = $scope.searchText.match(pattern) || [1];
          $scope.quantity = parseInt($scope.quantity[$scope.quantity.length-1]);
          searchText = $scope.searchText.replace(pattern, '').trim() || $scope.quantity;
          $scope.suggestions[0] = {name: searchText}
          if(searchText === $scope.quantity) {$scope.quantity = 1}
          console.log($scope.quantity, searchText);
          $http.get(attrs.url + '/' + searchText)
          .success(function(data) {
            if(!validated){
              if (Utils.arrayObjectIndexOf(data, searchText, 'name') === -1) {
                data.unshift({name: searchText});
              }
              data.map(function(suggestion){
                suggestion.category = suggestion.category || '';
                suggestion.className = suggestion.category.toSlug();
              })
              $scope.suggestions = data || [];
              $scope.selectedIndex = 0;
            }
          });
        } else {
          $scope.selectedIndex = 0;
          $scope.suggestions = [];
          $scope.quantity = 0;
        }
      }

      $scope.checkKeyDown = function(event) {
        validated = false;
        if (event.keyCode === 40) { //down key, increment selectedIndex
          event.preventDefault();
          if ($scope.selectedIndex + 1 !== $scope.suggestions.length) {
            $scope.selectedIndex++;
          }
          if ($scope.selectedIndex == 0) {$scope.selectedIndex = 1;}
        } else if (event.keyCode === 38) { //up key, decrement selectedIndex
          event.preventDefault();
          if ($scope.selectedIndex - 1 !== -1) {
            $scope.selectedIndex--;
          }
        } else if (event.keyCode === 13) { //enter pressed
          console.log('pressend enter', $scope.searchText);
          if($scope.searchText){
            console.log('save entry');
            event.preventDefault();
            $scope.addToModel($scope.selectedIndex);
          }
        }
      }

      $scope.addToModel=function(index){
        if(index === -1) index = 0;
        $scope.model = $scope.model || [];
        var arrayObjectIndexOfId = Utils.arrayObjectIndexOf($scope.model, $scope.suggestions[index]._id, '_ingredient._id');
        var arrayObjectIndexOfName = Utils.arrayObjectIndexOf($scope.model, $scope.suggestions[index].name, '_ingredient.name');
        if(arrayObjectIndexOfId===-1){
          $scope.model.push({
            _ingredient: $scope.suggestions[index],
            quantity: $scope.quantity
          });
        }else if(arrayObjectIndexOfName > -1){
          $scope.model[arrayObjectIndexOfName].quantity = $scope.quantity;
        }else{
          $scope.model[arrayObjectIndexOfId].quantity = $scope.quantity;
        }
        $scope.searchText='';
        $scope.suggestions=[];
        $scope.quantity = 0;
        validated = true;
        $scope.$emit('change');
      }

      $scope.print = function(variable){
        console.log("hého", variable);
      }

      $scope.$watch('selectedIndex',function(val){
        if(val > 0 && val < $scope.suggestions.length) {
          $scope.searchText = $scope.quantity + ' ' + $scope.suggestions[$scope.selectedIndex].name;
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
