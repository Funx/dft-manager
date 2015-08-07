angular.module('selection.service', [])

.factory('Selection', [
  '$rootScope'
  ,'Item'
  ,function Selection ($rootScope, Item) {
    var api
      , selection = []

    function clean () {
      selection = _.unique(selection)
      saveState()
    }

    function saveState () {
      sessionStorage.selection = angular.toJson(selection)
    }

    function restoreState () {
      if (sessionStorage.selection) {
        selection = angular.fromJson(sessionStorage.selection)
      }
    }

    function deleteSelected (done) {
      if(selection.length) {
        Item.delete(selection._id, selection, () => api.emptySelection(done))
      }
    }

    $rootScope.$on("plzDelete", deleteSelected)
    $rootScope.$on("savestate", saveState)
    $rootScope.$on("restorestate", restoreState)

    restoreState()

    return api = {
      get: function getSelection (done) {
        console.log('get selection', selection)

        if(done) done(angular.copy(selection))
        return angular.copy(selection)
      }
      ,set: function setSelection (givenSelection, done) {
        selection = givenSelection
        clean()
        if(done) return done()
        console.log('set selection', selection)
      }
      ,add: function addToSelection (itemOrArray) {
        _.isArray(itemOrArray) ?
          selection = selection.concat(itemOrArray) : selection.push(itemOrArray)
        clean()
        console.log('addToSelection', selection)
      }
      ,remove: function removeFromSelection (itemOrArray, done) {
        if(_.isArray(itemOrArray)) {
          itemOrArray.forEach((item) => {
            this.remove(item)
          })
          if(done) return done()
        } else {
          var index = selection.indexOf(itemOrArray)
          if (index > -1) {
            selection.splice(index, 1)
            console.log('removeFromSelection', selection)
          }
          if(done) return done()
        }
      }
      ,empty: function emptySelection (done) {
        this.set([], done)
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
