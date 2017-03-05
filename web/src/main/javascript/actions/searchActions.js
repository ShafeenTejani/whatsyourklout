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
      const names = JSON.parse(response).map(e => (
        {name: e.name,
          id: e.id_str,
          handle: e.screen_name,
          profile_pic: e.profile_image_url
        }));
      callback(names);
    }
  });
};

export const valueChanged = (value) => {
  return {
    type: 'VALUE_CHANGED',
    payload: value
  }
};
