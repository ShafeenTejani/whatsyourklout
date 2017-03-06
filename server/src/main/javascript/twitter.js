var Twitter = require('twitter-node-client').Twitter;
var _ = require('lodash');
var config = require("../../../config").twitterConfig;
var twitter = new Twitter({
  consumerKey: config.consumerKey,
  consumerSecret: config.consumerSecret,
  accessToken: config.accessToken,
  accessTokenSecret: config.accessTokenSecret
});


function search(query, error, success) {
  twitter.getCustomApiCall('/users/search.json',{ q: query, count: 5}, error, function(response) {
    var users = JSON.parse(response);
    success(_.map(users, function(user) {
      return {
        id: user.id_str,
        name: user.name,
        handle: user.screen_name,
        profile_pic: user.profile_image_url
      };
    }));
  });
}

function getUsers(query, error, success) {
  twitter.getCustomApiCall('/users/lookup.json',{ screen_name: query, include_entities: false}, error, function(response) {
    var users = JSON.parse(response);
    success(_.map(users, function(user) {
      return {
        id: user.id_str,
        name: user.name,
        handle: user.screen_name,
        profile_pic: user.profile_image_url
      };
    }));
  });
}

module.exports = {
  client: twitter,
  getUsers: getUsers,
  search: search
};
