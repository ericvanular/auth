var Beer = require('../models/Beer');
var bodyparser = require('body-parser');

module.exports = function(router) {
  router.use(bodyparser.json());

  // query DB for ALL beers
  router.get('/beers', function(req, res) {
    Beer.find({ userId: req.user._id }, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });

  // post a new beer to DB
  router.post('/beers', function(req, res) {
    // Create a new instance of the Beer model
    var beer = new Beer();
    // Set the beer properties that came from the POST data
    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;
    beer.userId = req.user._id;
    // save the beer to DB
    beer.save(function (err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });

  // query DB for a specific beer
  router.get('/beers/:beer_id', function(req, res) {
    Beer.find({ userId: req.user._id, _id: req.params.beer_id }, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });

  // update DB data for a specific beer
  router.put('/beers/:beer_id', function(req, res) {
    // Use the Beer model to find a specific beer
    Beer.update({ userId: req.user._id, _id: req.params.beer_id }, { quantity: req.body.quantity }, function(err, num, raw) {
      if (err)
        return res.send(err);

      res.json({ message: num + ' updated' });
    });
  });

  // remove a specific beer from DB
  router.put('/beers/:beer_id', function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Beer.remove({ userId: req.user._id, _id: req.params.beer_id }, function(err) {
      if (err)
        return res.send(err);

      res.json({ message: 'Beer removed from the locker!' });
    });
  });

}
