// app/routes.js

async = require("async");

// load the Item model
var Item = require('./models/Item');

// expose the routes to our app with module.exports
module.exports = function(app) {

  app.get('/api/items', function(req,res){
    console.log('get');
    getItems.exec(function(err,items){
      console.log('========');
      console.log('get item');
      res.json(items);
    });
  });

  var getItems = Item.find({}).populate('recipe._ingredient');

  // create Item and send back all Items after creation
  app.post('/api/items', function(req, res) {
    // create a Item, information comes from AJAX request from Angular
    var data = {}
    console.log("post");

    async.each(req.body.recipe,
      function(dosage, callback){
        console.log(dosage);
        if(!dosage._ingredient._id) {
          Item.find({'name': dosage._ingredient.name}).exec(function(err, item){
            if(item.length) {
              console.log('==item with same name already exists',item[0]);
              dosage._ingredient = item[0]._id;
              callback();
            }else{
              var ingredient = new Item(dosage._ingredient);
              ingredient.save(function(err,item){
                if (err) throw (err);
                console.log("==creaate a new ingredient")
                dosage._ingredient = item._id;
                callback();
              });
            }
          });
        }else{ // else just replace the ingredient by its ref
          dosage._ingredient = dosage._ingredient._id;
          callback();
        }
      }, function(err){ //save the item
        // create a new one if not in database
        if (err) throw (err)
        if(!req.body._id){
            var item = new Item(req.body);
            item.save(function(err,item){
              if (err) throw (err)
              data.lastEdit = item;
              getItems.exec(function(err,items){
                if (err) throw (err)
                data.list = items;
                console.log('========');
                console.log('created item');
                res.json(data);
              });
            });
            console.log('new item');
          }else{ // else we just update it
            Item.update({_id: req.body._id}, req.body, {overwrite: true}, function(err,item){
              if (err) throw err;
              data.lastEdit = item;
              getItems.exec(function(err,items){
                if (err) throw err;
                console.log('========');
                console.log('updated item');
                data.list = items;
                res.json(data);
              });
            });
          }
      }
    )
  });

  // delete a Item
  app.delete('/api/items/:item_id', function(req, res) {
    Item.remove({
      _id: req.params.item_id
    }, function(err,item){
      if (err) throw (err);
      getItems.exec(function(err,items){
        if (err) throw (err);
        console.log(items);
        return res.json(items);
      });
    });
  });

  // search an item
  app.get('/api/search/items/:query_string', function(req, res){
    if(req.params.query_string){
      Item
      .find({
        'name': {
          '$regex': req.params.query_string,
          '$options': 'i'
        }
      })
      .limit(5)
      .exec(function(err,items){
        if(err) throw err
        res.send(items);
      });
    }
  });

  // search an item
  app.get('/api/search/items/:category/:name', function(req, res){
    if(req.params.name && req.params.category){
      Item
      .find({
        'name': {
          '$regex': req.params.name,
          '$options': 'i'
        },
        'category': req.params.category
      })
      .limit(5)
      .populate('recipe._ingredient')
      .exec(function(err,items){
        if(err) throw err
        if(items.length === 1) res.send(items[0]);
        else res.send(false);
      });
    }
  });

  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
    console.log("get *");
    // Item.remove({
    //   _id: '555e4e51977c5eea6b3c7dff'
    // })
    res.sendFile(app.dir + '/build/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });


  var promise = function(err, item, req, res) {
    if (err) throw (err)
    getItems.exec(function(err,items){
      res.json(items);
    });
  }

};
