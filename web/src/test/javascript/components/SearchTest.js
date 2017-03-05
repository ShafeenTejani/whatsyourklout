import React from 'react'
import expect from 'must'
import { mount } from 'enzyme'
import sinon from 'sinon'
import mustSinon from 'must-sinon'
mustSinon(expect);

import { SearchComponent } from '../../../main/javascript/components/Search'

describe('Search', () => {
  it('should render the list of suggestions', () => {
    const suggestions = [
      { name: 'Barack Obama', id: '123'},
      { name: 'Donald Trump', id: '456'}
    ];
    const component = mount(<SearchComponent
      onSuggestionsFetchRequested={() =>{}}
      onSuggestionsClearRequested={() => {}}
      onValueChanged={() => {}}
      suggestions={suggestions}
      value="X"
      />);

      component.find('input').first().simulate('focus');

      const text = component.find('.search-result .name').map(e => e.text());

      expect(text).to.eql(['Barack Obama', 'Donald Trump']);
  });

  it('should call onSuggestionSelected when a suggestion is selected', () => {
    const suggestionSelectedSpy = sinon.spy();
    const suggestions = [
      { name: 'Barack Obama', id: '123'},
      { name: 'Donald Trump', id: '456'}
    ];
    const component = mount(<SearchComponent
      onSuggestionsFetchRequested={() =>{}}
      onSuggestionsClearRequested={() => {}}
      onSuggestionSelected={suggestionSelectedSpy}
      onValueChanged={() => {}}
      suggestions={suggestions}
      value="X"
      />);

      component.find('input').first().simulate('focus');
      component.find('.search-result').first().simulate('click');

      expect(suggestionSelectedSpy.lastCall.args[1].suggestion).to.eql(suggestions[0]);
  });

  it('should call onSuggestionsFetchRequested when search text is entered', () => {
    const fetchSpy = sinon.spy();
    const component = mount(<SearchComponent
      onSuggestionsFetchRequested={fetchSpy}
      onSuggestionsClearRequested={() => {}}
      onValueChanged={() => {}}
      suggestions={[]}
      value=""
      />);

    component.find('input').get(0).value = 'ABC';
    component.find('input').first().simulate('change');

    expect(fetchSpy.lastCall.args[0]).to.eql({ value: 'ABC' });

  });

  it('should call onSuggestionsClearRequested when search text is cleared', () => {
    const clearSpy = sinon.spy();
    const component = mount(<SearchComponent
      onSuggestionsFetchRequested={() => {}}
      onSuggestionsClearRequested={clearSpy}
      onValueChanged={() => {}}
      suggestions={[]}
      value="ABC"
      />);

    component.find('input').get(0).value = '';
    component.find('input').first().simulate('change');

    expect(clearSpy.called).to.be.true();
  });
});
