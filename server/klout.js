var request = require("request");
var apiKey = "5upbq28kbg94vhdrtqvxgh73";

function getScore(twitterUsername, error, success) {
  var url = "http://api.klout.com/v2/identity.json/twitter?screenName=" + twitterUsername + "&key=" + apiKey;
  request.get(url, function(e, response, body) {
    if (e) {
      error({error: e});
    }
    else if (response.statusCode == 200) {
      var kloutId = JSON.parse(body)["id"];
      getScoreForId(kloutId, error, success);
    } else {
      error({status: response.statusCode});
    }
  });
}


function getScoreForId(kloutId, error, success) {
  var url = "http://api.klout.com/v2/user.json/" + kloutId + "/score?key=" + apiKey;
  request.get(url, function(e, response, body) {
    if (e) {
      error({error: e});
    }
    else if (response.statusCode == 200) {
      var score = JSON.parse(body);
      score['id'] = kloutId;
      success(score);
    } else {
     error({status: response.statusCode});
    }
  });
}

function getInfluence(kloutId, error, success) {
  var url = "http://api.klout.com/v2/user.json/" + kloutId + "/influence?key=" + apiKey;
  request.get(url, function(e, response, body) {
    if (e) {
      error({error: e});
    }
    else if (response.statusCode == 200) {
      success(JSON.parse(body));
    } else {
     error({status: response.statusCode});
    }
  });
}

module.exports = {
  getScore: getScore,
  getInfluence: getInfluence
};
