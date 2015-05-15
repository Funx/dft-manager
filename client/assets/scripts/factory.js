(function(){
  //views are :
  //(- all)
  // - pending
  // - processing
  // - selling
  // - ignoring
  // - recipe

  //window.history = [];

  processItem = function(itemId){
    //moves item from "pending" to "processing" then updates ressources list
    //update database
    //history.push({function:unprocessItem,parameters:[itemId]});
  };

  unprocessItem = function(itemId){
    //do the opposite of processItem(itemId)
  };

  craftItem = function(itemId){
    //moves item from "processing" to "selling" then updates ressources list
    //update database
  };

  uncraftItem = function(itemId){
    //do the opposite of craftItem(itemId)
  }

  sellItem = function(itemId){
    //moves item from "selling" to "pending"
    //update database
    // = removeItem(itemId);
  };

  unsellItem = function(itemId){
    //do the opposite of sellItem()
  }

  removeItem = function(itemId){
    //moves item back to "pending", removes it from the current scope
    //update database
  };

  ignoreItem = function(itemId){
    //moves item to ignore list
    //update database
  };

  unignoreItem = function(itemId){
    //removes item from ignore list
    //update database
    // = removeItem(itemId);
  };

  flagAsBasic = function(itemId){
    //flag as basic
    //update database
  };

  unflagAsBasic = function(itemId){
    //unflag as basic
    //update database
  };

  flagAsMissing = function(itemId){

  }

  unflagAsMissing = function(itemId){

  }

  setPrice = function(itemId,price){
    //check if price is an integer then edit item's price and update database
  };

  edit = function(itemId){

  }

  get = {
    all: function(category){
      //returns every item from a category
      //default = everything
      //$http.get(); //get an array of item objects
      return;
    },
    items : function(){
      //gives every item with a recipe and not flagged as basic -> != get.recipe()
      return;
    },
    recipe : function(){
      //gives every item without a recipe and/or flagged as basic -> != get.items()
      return;
    },
    recipeOf : function(itemOrArray){
      //gives every child item without a recipe and/or flagged as basic and how many
      // #recursivity
      return;
    },
    pendingItems : function(){
      return get.items();
    },
    processingItems : function(){
      //$http.get(processing)
      return ; //list of id
    }
    sellingItems : function(){
      //$http.get(selling)
      return ; //list of id
    }
  };

})();
