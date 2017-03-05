var request = require("request-promise");
var apiKey = "5upbq28kbg94vhdrtqvxgh73";


function getKlout(twitterUsername, error, success) {
  var url = "http://api.klout.com/v2/identity.json/twitter?screenName=" + twitterUsername + "&key=" + apiKey;
  request(url).then(function(body) {
                      return JSON.parse(body)["id"];;
                    })
              .then(getScoreForId)
              .then(getInfluence)
              .then(success)
              .catch(error);
}

function getScoreForId(kloutId) {
  var url = "http://api.klout.com/v2/user.json/" + kloutId + "/score?key=" + apiKey;
  return request(url).then(function(body) {
    var score = JSON.parse(body);
    score['id'] = kloutId;
    return score
  });
}

function getInfluence(score) {
    var url = "http://api.klout.com/v2/user.json/" + score.id + "/influence?key=" + apiKey;
    return request(url).then(function(body) {
      return {
        score: score,
        influence: JSON.parse(body)
      }
    });
}

module.exports = {
  getKlout: getKlout
};
