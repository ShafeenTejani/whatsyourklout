import React from 'react'
import expect from 'must'
import { shallow } from 'enzyme'

import App from '../../../main/javascript/components/App'

describe('App', () => {
  it('should render Hello, World!', () => {
    const app = shallow(<App/>);

    expect(app.text()).to.equal("Hello, World!");
  });
});
