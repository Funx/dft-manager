// app/routes.js

// load the Item model
var Item = require('./models/Item');

// expose the routes to our app with module.exports
module.exports = function(app) {


  app.get('/api/items', function(req,res){
    console.log('get');
    getItems.exec(function(err,items){
      res.json(items);
    });
  });

  var getItems = Item.find({}).populate('recipe._ingredient');

  // create Item and send back all Items after creation
  app.post('/api/items', function(req, res) {
    // create a Item, information comes from AJAX request from Angular
    var data = {}
    console.log("post");
    if(!req.body._id){
      var item = new Item(req.body);
      item.save(function(err,item){
        if (err) throw (err)
        data.lastEdit = item;
        getItems.exec(function(err,items){
          data.list = items;
          res.json(data);
        });
      });
      console.log('new item');
    }else{
      Item.update({_id: req.body._id}, req.body, {overwrite: true}, function(err,item){
        if (err) throw (err)
        data.lastEdit = item;
        getItems.exec(function(err,items){
          data.list = items;
          res.json(data);
        });
      });
      console.log('updated item');
    }
  });

  // delete a Item
  app.delete('/api/items/:item_id', function(req, res) {
    Item.remove({
      _id: req.params.item_id
    }, function(err,item){
      if (err) throw (err)
      getItems.exec(function(err,items){
        res.json(items);
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

  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
    console.log("get *");

    res.sendFile(app.dir + '/build/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });


  var promise = function(err, item, req, res) {
    if (err) throw (err)
    getItems.exec(function(err,items){
      res.json(items);
    });
  }

};
