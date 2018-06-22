var twitter = require("../config/twitter_config");
var express = require("express");
var router = express.Router();

const Coord = require('../models/tweet');

/* GET home page. */
router.get("/", (req, res, next) => {
  twitter.get('search/tweets', {
    q: '#wildfire'
  }, function (error, tweets, response) {
    if (error) {
      return res.send(error);
    }


    var coordinatesObj = [];

    for (placeKey in tweets.statuses) {
      if (tweets.statuses[placeKey].place && tweets.statuses[placeKey].place !== undefined) {
        if (tweets.statuses[placeKey].place != null) {
          if (tweets.statuses[placeKey].place.bounding_box.coordinates.length > 0) {
            tweets.statuses[placeKey].place.bounding_box.coordinates.forEach(function (coordinate) {
              console.log(coordinate);
              // coordinatesObj.push({
              //   placeKey: {
              //     lat: tweets.statuses[placeKey].place.bounding_box.coordinates[i],
              //     lng: tweets.statuses[placeKey].place.bounding_box.coordinates[i]
              //   }
              // });
            });
          }
        }
      }

      // if (tweets.statuses[placeKey].quoted_status && tweets.statuses[placeKey].quoted_status !== undefined) {
      //   if (tweets.statuses[placeKey].quoted_status && tweets.statuses[placeKey].quoted_status !== undefined) {
      //     if (tweets.statuses[placeKey].quoted_status.place != null) {
      //       for (var i = 0; i <= tweets.statuses[placeKey].quoted_status.place.bounding_box.coordinates[0].length; i++) {

      //         if (tweets.statuses[placeKey].quoted_status.place.bounding_box.coordinates[0][i] !== undefined) {
      //           coordinatesObj.push({
      //             lat: tweets.statuses[placeKey].quoted_status.place.bounding_box.coordinates[0][i][1],
      //             lng: tweets.statuses[placeKey].quoted_status.place.bounding_box.coordinates[0][i][0]
      //           })
      //         }

      //       }
      //     }
      //   }

      // }

    }

    console.log(coordinatesObj);

    let crd = new Coord({
      coordinates: [{
          lat: 30.569094,
          lng: 76.515454
        },
        {
          lat: 30.569094,
          lng: 76.860158
        },
        {
          lat: 30.938966,
          lng: 76.860158
        },
        {
          lat: 30.938966,
          lng: 76.515454
        },
      ]
    });

    try {
      genre = crd.save();
      res.render('index', {
        data: coordinatesObj
      });
    } catch (error) {
      console.log(error.message);
    }


  });
});


module.exports = router;