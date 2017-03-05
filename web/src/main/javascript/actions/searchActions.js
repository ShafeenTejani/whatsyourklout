import nanoajax from "nanoajax"

export const clearSuggestions = () => {
  return {
    type: 'SUGGESTIONS_CLEARED'
  }
};

export const fetchSuggestions = (query) => (dispatch) => {
  fetchSearchResultsFromApi(query, (names) => (
    dispatch({
      type: 'SUGGESTIONS_FETCHED',
      payload: names
    })
  ));
};


const fetchSearchResultsFromApi = (query, callback) => {
  nanoajax.ajax({url: `/api/search?q=${query}`}, function(code, response) {
    if (code == 200) {
      const results = JSON.parse(response)
      callback(results);
    }
  });
};

export const valueChanged = (value) => {
  return {
    type: 'VALUE_CHANGED',
    payload: value
  }
};
