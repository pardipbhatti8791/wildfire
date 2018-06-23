var twitter = require("../config/twitter_config");
var express = require("express");
var router = express.Router();

const Coord = require('../models/tweet');

/* GET home page. */
router.get("/", async (req, res) => {
  res.render('index');
});

router.post('/getLatLng', async (req, res) => {
  var gpObjectData = [];
  const coordData = await Coord.find().select('coordinates -_id');
  for(key in coordData) {
    gpObjectData.push({
      lat: coordData[key].coordinates.lat,
      lng: coordData[key].coordinates.lng
    })
  }

  res.json(gpObjectData);
})


router.get('/tweets', async (req, res) => {
  twitter.get('search/tweets', {
    q: '#wildfire'
  }, function (error, tweets, response) {
    if (error) {
      return res.send(error);
    }

    res.send(tweets.statuses);
    var latLongObj = [];
    for (placeKey in tweets.statuses) {

      if (tweets.statuses[placeKey].geo && tweets.statuses[placeKey].geo !== undefined) {
        if (tweets.statuses[placeKey].geo != null) {
          try {
            let crd = new Coord({
              coordinates: {
                'lat': tweets.statuses[placeKey].geo.coordinates[0],
                'lng': tweets.statuses[placeKey].geo.coordinates[1]
              }
            });
            crdResponse = crd.save();
          } catch (error) {
            console.log(error.message);
          }
        }
      }
    }

  });
});


module.exports = router;