import React from 'react'
import expect from 'must'
import { mount } from 'enzyme'

import User from '../../../main/javascript/components/User'

describe('User', () => {

  const selected = {
    id: "1",
    name: "First User",
    handle: "firstUser",
    profile_pic: "first_user.png"
  };

  it("should render user info", () => {
    const app = mount(<User user={{selected, klout: null}}/>);

    expect(app.find(".user-name").text()).to.be(selected.name);
    expect(app.find(".handle").text()).to.be("@" + selected.handle);
    expect(app.find(".profile-pic").prop("src")).to.be(selected.profile_pic);
  });
});
