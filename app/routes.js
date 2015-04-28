// app/routes.js

// load the Item model
var Item = require('./models/Item');

// expose the routes to our app with module.exports
module.exports = function(app) {

  app.get('/api/items', function(req, res) {
    console.log("get");

    Item
    .find({})
    .populate('recipe._ingredient')
    .exec(function(err, items) {
      if (err) return handleError(err)
      console.log(items)
      res.json(items); // return all Items in JSON format
    });
  });

  // create Item and send back all Items after creation
  app.post('/api/items', function(req, res) {
    // create a Item, information comes from AJAX request from Angular
    console.log("post");
    var item = new Item(req.body);
    item.save(function(err, item) {
      if (err) return handleError(err)
      // get and return all the Items after you create another
      Item.find(function(err, items) {
        if (err) return handleError(err)
        res.json(items);
      });

      console.log("new item");

    });
  });

  // delete a Item
  app.delete('/api/items/:item_id', function(req, res) {
    Item.remove({
      _id: req.params.item_id
    }, function(err, item) {
      if (err) return handleError(err)

      // get and return all the Items after you create another
      Item.find(function(err, items) {
        if (err) return handleError(err)
        res.json(items);
      });

    });
  });

  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
    console.log("get *");

    res.sendfile('./build/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });

};
