import React from 'react'
import expect from 'must'
import { mount, shallow } from 'enzyme'

import User from "../../../main/javascript/components/User"
import Klout from "../../../main/javascript/components/Klout"

describe('User', () => {

  const selected = {
    id: "1",
    name: "First User",
    handle: "firstUser",
    profile_pic: "first_user.png"
  };

  it("should render user info", () => {
    const component = mount(<User user={{selected, klout: null}}/>);

    expect(component.find(".user-name").text()).to.be(selected.name);
    expect(component.find(".handle").text()).to.be("@" + selected.handle);
    expect(component.find(".profile-pic img").prop("src")).to.be(selected.profile_pic);
  });

  it("should render loading if there is no klout", () => {
    const component = mount(<User user={{selected, klout: null}}/>);

    expect(component.find(".loading").length).to.be(1);
    expect(component.find(Klout).length).to.be(0);
  });


  it("should render a message if the klout failed to load", () => {
    const klout = {
      failed: true
    };

    const component = shallow(<User user={{selected, klout}}/>);

    expect(component.find(".loading").length).to.be(0);
    expect(component.find(Klout).length).to.be(0);
    expect(component.find(".klout-failed").text()).to.eql("Unable to load klout");
  });

  it("should render the klout when it is available", () => {
    const klout = {
      score: {
        score: 14.5
      },
      influence: {
        myInfluencers: [],
        myInfluencees: []
      }
    };
    const component = shallow(<User user={{selected, klout}}/>);

    expect(component.find(".loading").length).to.be(0);
    expect(component.find(Klout).length).to.be(1);
    expect(component.find(Klout).props()).to.eql({
      score: klout.score,
      influence: klout.influence
    });
  });
});
