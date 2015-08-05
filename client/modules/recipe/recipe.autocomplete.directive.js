angular.module('recipe.autocomplete.directive', [])

.directive('autoComplete', [
   '$http'
  ,'$timeout'
  ,'Utils'
  ,function autoCompleteDirective ($http, $timeout, Utils) {
  return {
     restrict: 'AE'
    ,$scope: false
    ,templateUrl: '/modules/recipe/recipe.autocomplete.html'
    ,link: function autoCompleteLink ($scope, elem, attrs) {
      var validated = false //flag to know if the user already hit enter for the previous suggestions

      $scope.suggestions = []
      $scope.selectedIndex = 0
      $scope.placeHolder = attrs.placeholder || 'Start typing'

      $scope.search = () => {
        if($scope.searchText) {
          var quantityPattern = /^([0-9])+/gm
          $scope.quantity = $scope.searchText.match(quantityPattern) || [1]
          $scope.quantity = parseInt($scope.quantity[$scope.quantity.length-1])

          var searchText = $scope.searchText.replace(quantityPattern, '').trim()
          if (!searchText) {
            searchText = $scope.quantity
            $scope.quantity = 1
          }

          $scope.suggestions[0] = {
            name: searchText
          }
          console.log(attrs.url + '/' + searchText)
          
          $http.get(attrs.url + '/' + searchText)
          .success((data) => {
            if(validated){
              $scope.selectedIndex = 0
              $scope.suggestions = []
              $scope.quantity = 0
            } else {
              if (Utils.arrayObjectIndexOf(data, searchText, 'name') === -1) {
                data.unshift({name: searchText})
              }

              data.map((suggestion) => {
                suggestion.category = suggestion.category || ''
                return suggestion
              })

              $scope.suggestions = data || []
              $scope.selectedIndex = 0
            }
          })
        }
      }

      $scope.checkKeyDown = (event) => {

        validated = false
        if (event.keyCode === 40) { //down key, increment selectedIndex

          event.preventDefault()
          if ($scope.selectedIndex + 1 !== $scope.suggestions.length) $scope.selectedIndex++
          if ($scope.selectedIndex == 0) $scope.selectedIndex = 1

        } else if (event.keyCode === 38) { //up key, decrement selectedIndex

          event.preventDefault()
          if ($scope.selectedIndex - 1 !== -1) $scope.selectedIndex--

        } else if (event.keyCode === 13) { //enter pressed

          if($scope.searchText){
            event.preventDefault()
            $scope.addToModel($scope.selectedIndex)
          }

        }
      }

      $scope.addToModel=(index) => {

        (index === -1) ? index = 0 : false
        $scope.model = $scope.model || []

        var arrayObjectIndexOfId = Utils.arrayObjectIndexOf(
          $scope.model, $scope.suggestions[index]._id, '_ingredient._id'
        )

        var arrayObjectIndexOfName = Utils.arrayObjectIndexOf(
          $scope.model, $scope.suggestions[index].name, '_ingredient.name'
        )

        if(arrayObjectIndexOfId === -1) {

          $scope.model.push({
            _ingredient: $scope.suggestions[index],
            quantity: $scope.quantity
          })

        } else if (arrayObjectIndexOfName > -1) {

          $scope.model[arrayObjectIndexOfName].quantity = $scope.quantity

        } else {

          $scope.model[arrayObjectIndexOfId].quantity = $scope.quantity

        }

        $scope.searchText=''
        $scope.suggestions=[]
        $scope.quantity = 0
        validated = true
        $scope.$emit('change')

      }

      $scope.$watch('selectedIndex', (val) => {
        if(val > 0 && val < $scope.suggestions.length) {
          $scope.searchText = $scope.quantity + ' ' + $scope.suggestions[$scope.selectedIndex].name
        }
      })

      elem.find('input').bind('blur', () => {
        $timeout(() => {
          $scope.suggestions = []
          $scope.searchText = ''
        }, 200)
      })

      $scope.removeTag = (index) => {
        $scope.ingredients.splice(index, 1)
      }

    }
  }
}
])
