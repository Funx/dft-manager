angular.module('selection.service', [])

.factory('Selection', [
  '$rootScope'
  ,function Selection ($rootScope) {

    var selection = []

    var clean = function clean () {
      selection = _.unique(selection)
      saveState()
    }

    var saveState = function saveState () {
      sessionStorage.selection = angular.toJson(selection)
    }

    var restoreState = function restoreSelectionState () {
      selection = angular.fromJson(sessionStorage.selection)
    }

    $rootScope.$on("savestate", saveState)
    $rootScope.$on("restorestate", restoreState)

    restoreState()

    return {
      get: function getSelection () {
        console.log('get selection', selection)
        return angular.copy(selection)
      }
      ,set: function setSelection (givenSelection) {
        selection = givenSelection
        clean()
        console.log('set selection', selection)
      }
      ,add: function addToSelection (itemOrArray) {
        _.isArray(itemOrArray) ?
          selection = selection.concat(itemOrArray) : selection.push(itemOrArray)
        clean()
        console.log('addToSelection', selection)
      }
      ,remove: function removeFromSelection (itemOrArray) {
        if(_.isArray(itemOrArray)) {
          itemOrArray.forEach((item) => {
            this.remove(item)
          })
        } else {
          var index = selection.indexOf(itemOrArray)
          if (index > -1) {
            selection.splice(index, 1)
            console.log('removeFromSelection', selection)
          }
        }
      }
      ,empty: function emptySelection () {
        this.set([])
      }
      ,isSelected: function isSelected (item) {
        return (_.any(selection, function (_item) {
          return _item._id == item._id
        })) ? true : false
      }
      ,getLength: function getSelectionLength () {
        return selection.length
      }
      ,saveState: saveState
      ,restoreState: restoreState
    }
  }
])
