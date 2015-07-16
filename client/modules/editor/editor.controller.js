// js/controllers/main.js

angular.module('editor.controller', [])

.controller('EditorCtrl', [
   '$timeout'
  ,'$http'
  ,'Utils'
  ,'Editor'
  ,'Collection'
  ,'slugifyFilter'
  ,function EditorCtrl ($timeout, $http, Utils, Editor, Collection, slugify) {
    this.newItem = {}
    this.placeHolder = {
       name: "Nom de l'objet"
      ,type: "Type d'objet"
      ,category: "Catégorie"
      ,ingredient: {
         name: "Ingrédients"
      }
    };
    this.focus = 'name'

    this.savedItems = new Collection
    this.newDependencies = []
    this.waitingLine = []

      // when submitting the add form, send the text to the node API
    this.save = function createItem () {
      if (this.newItem.name) {

        var newItem = Editor.save(this.newItem).$promise
          .then(function (data) {
            this.savedItems.push(data.saved)
            this.newDependencies = this.newDependencies.concat(data.newDependencies)
          }.bind(this))

        console.log(newItem)

        this.newItem = {
          category: this.newItem.category,
          type: this.newItem.type
        } // clear the form so our user is ready to enter another

        this.focus = 'false'
        $timeout(function () {
          this.focus = 'name'
        })
      }
    }

    this.addChildIngredient = function addChildIngredient () {
      console.log(this.newItem);

      if (this.newItem.name && this.newItem.category && !this.newItem.recipe.length) {
        var query = false;
        switch (slugify(this.newItem.category)) {
          case
            'trophee-moyen':
            query = 'Trophée mineur/'
          break
          case
            'trophee-majeur':
            query = 'Trophée moyen/'
          break
          default :
            query = false
        }

        if (query) {
          var searchTerm = this.newItem.name
            .replace(/moyen/gi, '')
            .replace(/majeur/gi, '')

          query += searchTerm

          $http.get('/api/search/items/' + query)
          .success(function (data) {
            if (data) {
              this.newItem.recipe = []
              this.newItem.recipe.push({
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

                this.newItem.recipe.push({
                  _ingredient: data,
                  quantity: 1
                })
              }
            }

          }.bind(this))
        }

      }
    }

    // delete an Item after checking it
    this.deleteItem = function (id, index) {
      Items.delete(id)
        .success(function(data) {
          this.items = data;
        })
    }

}])
