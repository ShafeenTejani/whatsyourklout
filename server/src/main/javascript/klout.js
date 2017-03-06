var request = require("request-promise");
var _ = require("lodash");
var config = require("../../../config").kloutConfig;
var twitter = require("./twitter");

var apiKey = config.apiKey;

function getKlout(twitterUsername, error, success) {
  getKloutForUser(twitterUsername, error, function(klout) {
    getUsers(klout, error, function(kloutWithUsers) {
      success(kloutWithUsers);
    });
  });
}

function getKloutForUser(twitterUsername, error, success) {
  var url = "http://api.klout.com/v2/identity.json/twitter?screenName=" + twitterUsername + "&key=" + apiKey;
  request.get(url).then(function(body) {
                      return JSON.parse(body)["id"];;
                    })
              .then(getScoreForId)
              .then(getInfluence)
              .then(success)
              .catch(error);
}

function getScoreForId(kloutId) {
  var url = "http://api.klout.com/v2/user.json/" + kloutId + "/score?key=" + apiKey;
  return request.get(url).then(function(body) {
    var score = JSON.parse(body);
    score['id'] = kloutId;
    return score
  });
}

function getInfluence(score) {
    var url = "http://api.klout.com/v2/user.json/" + score.id + "/influence?key=" + apiKey;
    return request.get(url).then(function(body) {
      var influence = JSON.parse(body);

      return {
        id: score.id,
        score: score.score,
        influence: {
          myInfluencers: _.map(influence.myInfluencers, toInfluence),
          myInfluencees: _.map(influence.myInfluencees, toInfluence)
        }
      }
    });
}

function getUsers(klout, error, success) {
  var influencers = _.map(klout.influence.myInfluencers, toHandles);
  var influencees = _.map(klout.influence.myInfluencees, toHandles);
  var handles = influencers.concat(influencees).join(',')

  twitter.getUsers(handles, error, function (users) {
    var kloutWithUsers = zipUsersWithKlout(klout, users);
    success(kloutWithUsers);
  })
}

function zipUsersWithKlout(klout, users) {
  var kloutWithUsers = Object.assign({}, klout);

  var myInfluencers = _.map(klout.influence.myInfluencers, addUserTo(users));
  var myInfluencees = _.map(klout.influence.myInfluencees, addUserTo(users));

  return Object.assign({}, klout, {
    influence: {
      myInfluencers: myInfluencers,
      myInfluencees: myInfluencees
    }});
}

function addUserTo(users) {
  return function(influence) {
      return Object.assign({}, influence, { user: _.find(users, { handle: influence.handle})});
  };
}

function toHandles(klout) {
  return klout.handle;
}

function toInfluence(response) {
  return {
    id: response.entity.id,
    handle: response.entity.payload.nick,
    score: response.entity.payload.score.score
  };
}

module.exports = {
  getKlout: getKlout,
  twitter: twitter
};
