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
        clean()
      }
    }

    function deleteSelected (done) {
      if(selection.length) {
        selection.forEach((selected) => {
          console.log(selected._id)
          Item.delete({id: selected._id}, (...args) => console.log(args))
        })

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
      }
      ,add: function addToSelection (itemOrArray) {
        _.isArray(itemOrArray) ?
          selection = selection.concat(itemOrArray) : selection.push(itemOrArray)
        clean()
      }
      ,remove: function removeFromSelection (itemOrArray) {
        if(_.isArray(itemOrArray)) {
          itemOrArray.forEach((item) => {
            this.remove(item)
          })
        } else {
          selection = selection.filter((selected) => selected._id != itemOrArray._id)
          // console.log('removeFromSelection', selection)
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
