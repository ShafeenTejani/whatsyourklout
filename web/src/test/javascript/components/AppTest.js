import React from 'react'
import expect from 'must'
import { shallow } from 'enzyme'

import App from '../../../main/javascript/components/App'

describe('App', () => {
  it('should render', () => {
    const app = shallow(<App/>);
  });
});
