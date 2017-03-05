import klout from "../../main/javascript/klout"
import twitter from "../../main/javascript/twitter"
import expect from "must"
import sinon from "sinon"
import request from "request-promise"
import bluebird from "bluebird"

describe("klout", () => {

  let stubs = [];

  afterEach(() => {
    stubs.forEach(s => s.restore());
  })

  const influencerUser = {
    id: "1",
    name: "Influencer",
    handle: "influencer",
    profile_pic: "influencer.png"
  };

  const influenceeUser = {
    id: "2",
    name: "Influencee",
    handle: "influencee",
    profile_pic: "influencee.png"
  };

  it("fetches the score, influence and users for a given username", (done) => {
    stubTwitterUsers([influencerUser, influenceeUser]);

    stubKloutResponses({
      "identity.json/twitter?screenName=someUser": { id: "124"},
      "user.json/124/score": { score: { score: 11.2 }},
      "user.json/124/influence": {
        myInfluencers: [{
          entity: { id: "1",
            payload: {
              nick: "influencer",
              score: { score: 81.2 }
            }
          }
        }],
        myInfluencees: [{
          entity: { id: "2",
            payload: {
              nick: "influencee",
              score: { score: 91.2 }
            }
          }
        }]
      }
    });

    klout.getKlout("someUser", (e) => { done("error " + e)}, (results) => {
      expect(results).to.eql({
        id: "124",
        score: { score :11.2 },
        influence: {
          myInfluencers: [{id:"1", handle: "influencer", score: 81.2, user: influencerUser}],
          myInfluencees: [{id:"2", handle: "influencee", score: 91.2, user: influenceeUser}]
        }
      });
      done()
    });
  });

  const stubKloutResponses = (responses) => {
    stubs.push(sinon.stub(request, 'get', (url) => {
      const key = Object.keys(responses).find(k => url.indexOf(k) > -1);
      if (key) {
        return bluebird.resolve(JSON.stringify(responses[key]));
      }
    }));
  }

  const stubTwitterUsers = (users) => {
    stubs.push(sinon.stub(twitter, 'getUsers', (userlist, error, success) => {
        success(users);
    }));
  }

});
