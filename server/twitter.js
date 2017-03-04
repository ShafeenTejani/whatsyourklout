var Twitter = require('twitter-node-client').Twitter;
var twitter = new Twitter({
  consumerKey: "9qrmiHvFGzojxNn9ko1YjXMSj",
  consumerSecret: "JGICWUx9eUmtZjcP4TDLluvl5GVvTBnji2ZjBNr7EUIxRgfVsC",
  accessToken: "150250608-qnjzgRok1ig8hVjSWLiNrApplQh9jhVC9EEGf9Em",
  accessTokenSecret: "t2IlCu0SGsRPdyN2jndH9QxcMB8IWwQfY8asjycPUREWZ"
});


function search(query, error, success) {
  twitter.getCustomApiCall('/users/search.json',{ q: query, count: 5}, error, success);
}

function getUser(name, error, success) {
  twitter.getUser({'screen_name':name}, error, success);
}

module.exports = {
  getUser: getUser,
  search: search
};
