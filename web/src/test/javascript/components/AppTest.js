import React from 'react'
import expect from 'must'
import { shallow } from 'enzyme'

import { App } from '../../../main/javascript/components/App'
import Search from '../../../main/javascript/components/Search'
import User from '../../../main/javascript/components/User'

describe('App', () => {
  const initialState = {
    user: {
      selected: null,
      klout: null
    },
    search: {
      suggestions: [],
      value: ""
    }
  };

  it("should render Search component", () => {
    const app = shallow(<App user={initialState.user} search={initialState.search}/>);

    expect(app.find(Search).length).to.be(1);
  });

  it("should render the User component if there is a selected user", () => {
    const user = {
      selected: {
        id: "124",
        name: "A User",
        handle: "aUser",
        profile_pic: "user.png"
      },
      klout: null
    };

    const app = shallow(<App user={user} search={initialState.search}/>);

    expect(app.find(User).length).to.be(1);
    expect(app.find(User).props()).to.eql({ user });
    expect(app.find(".select-user-message").length).to.be(0);
  });

  it("should not render the User component if there is no selected user", () => {
    const app = shallow(<App user={initialState.user} search={initialState.search}/>);

    expect(app.find(User).length).to.be(0);
    expect(app.find(".select-user-message").length).to.be(1);
  });
});
