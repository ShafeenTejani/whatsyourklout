var twitterConfig = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_SECRET_KEY,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

var kloutConfig = {
  apiKey: process.env.KLOUT_API_KEY
};

module.exports = {
  twitterConfig: twitterConfig,
  kloutConfig: kloutConfig
};
