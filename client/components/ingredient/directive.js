angular.module('ingredient.directive', [
])

.directive('ingredient', [function(){
  return {
    restrict: "AE",
    priority: 0,
    scope: {
      model: '='
    },
    templateUrl: '/components/ingredient/template.html',
    link: function($scope, $element, $attributes, $ctrls){


    }
  }
}])

.directive('editableAutocomplete', ['editableDirectiveFactory',
  function(editableDirectiveFactory) {
    return editableDirectiveFactory({
      directiveName: 'editableAutocomplete',
      inputTpl: '<auto-complete url="/api/search/items" model="formData.newIngredient.name"></auto-complete>',
      autosubmit: function() {
        var self = this;
        self.inputEl.bind('change', function() {
          self.scope.$data = 'lol';
        });
      }
    });
}]);
