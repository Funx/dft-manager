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
          $rootScope.$emit('plzCreate')
          $location.path( "/create" )
        }
      }
      ,edit: {
        icon: '<=='
        ,expression: '"Editer " + fab.getSelectionLength() + " objets"'
        ,action: () => {
          $rootScope.$emit('plzEdit')
          $location.path( "/edit/selection" )
        }
      }
      ,watch: {
        icon: '< o >'
        ,expression: '"Observer sélection (" + fab.getSelectionLength() + ")"'
        ,action: () => {
          $rootScope.$emit('plzWatch')
          $rootScope.$emit('plzWatch:fu')
        }
      }
      ,unwatch: {
        icon: '< / >'
        ,expression: '"Ne plus observer sélection (" + fab.getSelectionLength() + ")"'
        ,action: () => {
          $rootScope.$emit('plzUnwatch')
          $rootScope.$emit('plzUnwatch:fu')
        }
      }
      ,delete: {
        icon: 'x'
        ,expression: '"!!!!!!! Supprimer les (" + fab.getSelectionLength() + " objets sélectionnés)"'
        ,action: () => {
          if(confirm('Êtes-vous sûr de vouloir supprimer les '+ this.getSelectionLength() +'objets sélectionnés ?')) {
            $rootScope.$emit('plzDelete')
          }
          // Selection.get().forEach(selected => Item.delete({id: selected._id}))
          // Selection.empty()
        }
      }
      ,selectVisible: {
        icon: '|+|'
        ,expression: '"Sélectionner visible"'
        ,action: () => {
          $rootScope.$emit('plzSelectVisible')
        }
      }
      ,unselectVisible: {
        icon: '|-|'
        ,expression: '"Désélectionner visible"'
        ,action: () => {
          $rootScope.$emit('plzUnselectVisible')
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
