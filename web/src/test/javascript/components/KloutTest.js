import React from 'react'
import expect from 'must'
import { mount } from 'enzyme'
import sinon from 'sinon'

import { Klout } from '../../../main/javascript/components/Klout'

describe("Klout", () => {

  const score = 45.667;

  const influence = {
    myInfluencers: [{
        id: "111",
        user: { handle: "kanyeWest" },
        score: 98.4232
      },
      {
        id: "2222",
        user: { handle:  "jayZ" },
        score: 89.654
      }
    ],
    myInfluencees: [{
        id: "333",
        user: { handle: "myBestFriend" },
        score: 56.234
    },
    {
        id: "444",
        user: { handle: "someOtherGuy" },
        score: 36.44
    }
  ]
  };

  it("should render the user's klout score to 1dp", () => {
    const component = mount(<Klout score={score} influence={influence}/>);

    expect(component.find(".klout-score .klout-score-value").text()).to.eql("45.7");
  });

  it("should render the user's top influencers and their klout scores", () => {
    const component = mount(<Klout score={score} influence={influence}/>);

    const influencers = component.find(".top-influencers").find(".influence-item").map(c => ({
       handle: c.find(".handle").text(),
       score: c.find(".klout-score-value").text()
    }));
    expect(influencers).to.eql([
      { handle: "@kanyeWest", score: "98.4" },
      { handle: "@jayZ", score: "89.7" }
    ]);
  });

  it("should render the user's top influencees and their klout scores", () => {
    const component = mount(<Klout score={score} influence={influence}/>);

    const influencers = component.find(".top-influencees").find(".influence-item").map(c => ({
       handle: c.find(".handle").text(),
       score: c.find(".klout-score-value").text()
    }));
    expect(influencers).to.eql([
      { handle: "@myBestFriend", score: "56.2" },
      { handle: "@someOtherGuy", score: "36.4" }
    ]);
  });

  it("should call onUserSelected when a influencer/ee has been clicked", () => {
    const onUserSelected = sinon.spy();
    const component = mount(<Klout score={score} influence={influence} onUserSelected={onUserSelected}/>);

    component.find(".influence-item").first().simulate("click");

    expect(onUserSelected.firstCall.args[0]).to.eql(influence.myInfluencers[0].user);
  });
});
