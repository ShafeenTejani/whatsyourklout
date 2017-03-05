import React from "react";
import Autosuggest from "react-autosuggest";
import { fetchSuggestions, clearSuggestions, valueChanged } from "../actions/searchActions"
import { userSelected } from "../actions/userActions"
import { connect } from "react-redux"

const renderSuggestion = (suggestion) => {
  return <span className='search-result'><span className='name'>{suggestion.name}</span> <b>@{suggestion.handle}</b> <img src={suggestion.profile_pic}/></span>
};

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
      onSuggestionSelected={props.onSuggestionSelected}
      inputProps={inputProps} />
  );
};


const mapStateToProps = (state) => {
  return state.search;
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
    },
    onSuggestionSelected: (event, { suggestion }) => {
      dispatch(userSelected(suggestion))
    }
  }
}
const Search = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);


export default Search;
