angular.module('selection.service', [])

.factory('Selection', [
  '$rootScope',
  function Selection ($rootScope) {

    var selection = [];

    var clean = function clean () {
      selection = _.unique(selection);
    }

    return {
      get: function getSelection () {
        console.log('get selection', selection);
        return selection;
      },
      set: function setSelection (givenSelection) {
        selection = givenSelection;
        clean();
        console.log('set selection', selection);
      },
      add: function addToSelection (itemOrArray) {
        _.isArray(itemOrArray) ? selection.concat(itemOrArray) : selection.push(itemOrArray);
        clean();
        console.log('addToSelection', selection);
      },
      remove: function removeFromSelection (itemOrArray) {
        if(_.isArray(itemOrArray)) {
          itemOrArray.forEach(function (item) {
            this.remove(item);
          });
        } else {
          var index = selection.indexOf(itemOrArray);
          if (index > -1) {
            selection.splice(index, 1);
            console.log('removeFromSelection', selection);
          }
        }
      },
      empty: function emptySelection () {
        this.set([]);
      }
    }
  }
])
