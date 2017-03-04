import React from "react";
import Autosuggest from "react-autosuggest";
import { fetchSuggestions, clearSuggestions, valueChanged } from "../actions/searchActions"
import { connect } from "react-redux"

const renderSuggestion = (suggestion) => (<span className='search-result'>{suggestion.name}</span>);

export const SearchComponent = (props) => {
  const inputProps = {
    placeholder: "Search for a twitter username...",
    value: props.value,
    onChange: props.onValueChanged
  };

  return (
    <Autosuggest
      suggestions={props.suggestions}
      onSuggestionsFetchRequested={props.onSuggestionsFetchRequested}
      onSuggestionsClearRequested={props.onSuggestionsClearRequested}
      getSuggestionValue={(suggestion) => suggestion.name}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps} />
  );
};


const mapStateToProps = (state) => {
  return {
    suggestions: state.suggestions,
    value: state.value
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSuggestionsFetchRequested: ({value}) => {
      dispatch(fetchSuggestions(value))
    },
    onSuggestionsClearRequested: () => {
      dispatch(clearSuggestions())
    },
    onValueChanged: (event, { newValue }) => {
      dispatch(valueChanged(newValue))
    }
  }
}
const Search = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent)


export default Search;
