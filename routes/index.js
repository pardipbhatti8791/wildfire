var twitter = require("../config/twitter_config");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  twitter.get('search/tweets', {q: 'wildfire'}, function(error, tweets, response) {
    if (error) {
      return res.send(error);
    }
    res.send(tweets);
 });
});


module.exports = router;
