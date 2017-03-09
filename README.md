# Whats Your Klout?

Find out how much Klout you have. Who are the people that influence you the most and who do you have a lot of sway over?

This application allows you to see the [Klout](https://klout.com/home) score for any Twitter user, as well as who their top influencers and influencees are.

Check out a running version here: (https://whatsyourklout.herokuapp.com/)

## Technologies

This application is written in JavaScript, with a [Node.js](https://nodejs.org/en/) server, and the [Redux](http://redux.js.org/docs/introduction/) and [React](https://facebook.github.io/react/) frameworks for the web interface

## Requirements

1. You will need both [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed on your machine.
1. Generate [access tokens for Twitter](https://dev.twitter.com/oauth/overview/application-owner-access-tokens) and an [API key for Klout](https://klout.com/s/developers/home) and add them to the [config.js](server/config.js) file, using [config.example.js](server/config.example.js) as a template.

## Running the application

1. `npm run build` will use webpack to build all of the front-end assets.
1. `npm start` will then start the application which should be running at [localhost:8000](http://localhost:8000)

