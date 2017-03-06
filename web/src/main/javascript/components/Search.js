import React from "react";
import Autosuggest from "react-autosuggest";
import { fetchSuggestions, clearSuggestions, valueChanged } from "../actions/searchActions"
import { userSelected } from "../actions/userActions"
import { connect } from "react-redux"

const renderSuggestion = (suggestion) => {
  return <div className='search-result'>
    <div className="profile-pic"><img src={suggestion.profile_pic}/></div>
    <div className="user-container">
      <div className="name">{suggestion.name}</div>
      <div className="handle">@{suggestion.handle}</div>
    </div>
  </div>
};

export const SearchComponent = (props) => {
  const inputProps = {
    placeholder: "Search Twitter...",
    value: props.value,
    onChange: props.onValueChanged
  };

  const suggestionSelected = (event, selection) => {
    props.onSuggestionSelected(event, selection);
    props.onValueChanged(event, { newValue: ""});
  }

  return (
    <div className="search-container">
      <Autosuggest
        suggestions={props.suggestions}
        onSuggestionsFetchRequested={props.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={props.onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.name}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={suggestionSelected}
        inputProps={inputProps} />
    </div>
  );
};


const mapStateToProps = (state) => {
  return state.search;
};

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
};

const Search = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);


export default Search;
