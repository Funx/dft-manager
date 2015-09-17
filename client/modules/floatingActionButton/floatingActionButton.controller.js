angular.module('floatingActionButton.controller', [])

.controller('FloatingActionButtonCtrl', [
  '$rootScope'
  ,'$location'
  ,'Selection'
  ,'Item'
  ,function($rootScope, $location, Selection, Item){
    this.actions = {
      create: {
        icon: '+',
        expression: '"Créer"',
        action: () => {
          $rootScope.$broadcast('plzCreate')
          $location.path( "/create" )
        }
      }
      ,edit: {
        icon: '<=='
        ,expression: '"Editer " + fab.getSelectionLength() + " objets"'
        ,action: () => {
          $rootScope.$broadcast('plzEdit')
          $location.path( "/edit/selection" )
        }
      }
      ,watch: {
        icon: '< o >'
        ,expression: '"Observer sélection (" + fab.getSelectionLength() + ")"'
        ,action: () => {
          $rootScope.$broadcast('plzWatch')
          $rootScope.$broadcast('plzWatch:fu')
        }
      }
      ,unwatch: {
        icon: '< / >'
        ,expression: '"Ne plus observer sélection (" + fab.getSelectionLength() + ")"'
        ,action: () => {
          $rootScope.$broadcast('plzUnwatch')
          $rootScope.$broadcast('plzUnwatch:fu')
        }
      }
      ,delete: {
        icon: 'x'
        ,expression: '"!!!!!!! Supprimer les (" + fab.getSelectionLength() + " objets sélectionnés)"'
        ,action: () => {
          if(confirm('Êtes-vous sûr de vouloir supprimer les '+ this.getSelectionLength() +'objets sélectionnés ?')) {
            $rootScope.$broadcast('plzDelete')
          }
          // Selection.get().forEach(selected => Item.delete({id: selected._id}))
          // Selection.empty()
        }
      }
      ,selectVisible: {
        icon: '|+|'
        ,expression: '"Sélectionner visible"'
        ,action: () => {
          $rootScope.$broadcast('plzSelectVisible')
        }
      }
      ,unselectVisible: {
        icon: '|-|'
        ,expression: '"Désélectionner visible"'
        ,action: () => {
          $rootScope.$broadcast('plzUnselectVisible')
        }
      }
      ,unselectAll: {
        icon: '|x|'
        ,expression: '"Vider la sélection"'
        ,action: () => {
          Selection.empty()
        }
      }
    }

    this.getSelectionLength = Selection.getLength

    this.getAvailableActions = function getAvailableActions () {
      if (!Selection.getLength()) {
        return ['create', 'selectVisible']
      }
      return ['watch', 'unwatch', 'edit', 'create', 'delete', 'unselectVisible', 'selectVisible', 'unselectAll']
    }

  }
])
