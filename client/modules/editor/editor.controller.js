// js/controllers/main.js

angular.module('editor.controller', [])

.controller('EditorCtrl', [
   '$timeout'
  ,'$http'
  ,'$routeParams'
  ,'$scope'
  ,'Utils'
  ,'Editor'
  ,'Selection'
  ,'Collection'
  ,'slugifyFilter'
  ,function EditorCtrl ($timeout, $http, $routeParams, $scope, Utils, Editor, Selection, Collection, slugify) {
    if ($routeParams.id) {
      switch ($routeParams.id) {
        case 'selection':
          console.log(Selection.get())
          this.waitingLine = Selection.get()
          Selection.empty()
        break
        default:
          // get Item from id
          this.waitingLine = []
      }
    } else {
      this.waitingLine = []
    }

    this.currItem = this.waitingLine.length ? this.waitingLine.shift() : {}
    this.placeHolder = {
       name: "Nom de l'objet"
      ,type: "Type d'objet"
      ,category: "Catégorie"
      ,ingredient: {
         name: "Ingrédients"
      }
    }
    this.focus = 'name'

    this.savedItems = []
    this.newDependencies = []

    console.log(this)

    var saveState = () => {
      var editor = {
        currItem: this.currItem
        ,newDependencies: this.newDependencies
        ,waitingLine: this.waitingLine
      }
      sessionStorage.editor = angular.toJson(editor)
    }

    var restoreState = () => {
      var editor = angular.fromJson(sessionStorage.editor)
      if(editor) {
        this.currItem = editor.currItem
        this.newDependencies = this.newDependencies.concat(editor.newDependencies)
        // this.waitingLine = this.waitingLine.concat(editor.waitingLine)
      }

    }

    $scope.$on("savestate", saveState)
    $scope.$on("restorestate", restoreState)

      // when submitting the add form, send the text to the node API
    this.save = () => {
      if (this.currItem.name) {

        var currItem = Editor.save(this.currItem).$promise
          .then((data) => {
            console.log(data)
            this.savedItems.push(data.registered)
            this.newDependencies = this.newDependencies.concat(data.dependencies)
          })

        this.editNext()

      }
    }

    this.editNext = (saveChanges) => {

      if (this.waitingLine.length) {
        this.currItem = this.waitingLine.shift()
        console.log(this.currItem)
      } else {
        this.currItem = {
          category: this.currItem.category
        } // clear the form so our user is ready to enter another
      }


      this.focus = 'false'
      $timeout(() => {
        this.focus = 'name'
      })
    }

    this.addChildIngredient = function addChildIngredient () {
      console.log(this.currItem)

      if (this.currItem.name && this.currItem.category && !this.currItem.recipe.length) {
        var query = false
        switch (slugify(this.currItem.category)) {
          case 'trophee-moyen':
            query = 'Trophée mineur/'
          break
          case 'trophee-majeur':
            query = 'Trophée moyen/'
          break
          default :
            query = false
        }

        if (query) {
          var searchTerm = this.currItem.name
            .replace(/moyen|majeur/gi, '')

          query += searchTerm

          $http.get('/api/search/items/' + query)
          .success((data) => {
            if (data) {
              this.currItem.recipe = []
              this.currItem.recipe.push({
                 _ingredient: data
                ,quantity: 1
              })

              var indexOfMetaObject = Utils.arrayObjectIndexOf(
                data.recipe, 'Méta', '_ingredient.category'
              )

              if(indexOfMetaObject > -1) {
                var ingredientName = data.recipe[indexOfMetaObject]._ingredient.name
                  .replace(/moyen/gi, 'majeur')
                  .replace(/mineur/gi, 'moyen')

                var data = {name: ingredientName}

                this.currItem.recipe.push({
                  _ingredient: data
                  ,quantity: 1
                })
              }
            }

          })
        }

      }
    }

    // delete an Item after checking it
    this.deleteItem = (id, index) => {
      Items.delete(id)
        .success((data) => {
          this.items = data
        })
    }

}])
