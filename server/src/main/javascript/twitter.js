var Twitter = require('twitter-node-client').Twitter;
var _ = require('lodash');
var twitter = new Twitter({
  consumerKey: "9qrmiHvFGzojxNn9ko1YjXMSj",
  consumerSecret: "JGICWUx9eUmtZjcP4TDLluvl5GVvTBnji2ZjBNr7EUIxRgfVsC",
  accessToken: "150250608-qnjzgRok1ig8hVjSWLiNrApplQh9jhVC9EEGf9Em",
  accessTokenSecret: "t2IlCu0SGsRPdyN2jndH9QxcMB8IWwQfY8asjycPUREWZ"
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
