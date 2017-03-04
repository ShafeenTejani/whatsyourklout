import { combineReducers } from 'redux'

const suggestions = (state = [], action) => {
  switch (action.type) {
    case 'SUGGESTIONS_FETCHED':
      return action.payload;
    case 'SUGGESTIONS_CLEARED':
      return [];

    default:
      return state;
  }
};

const value = (state = '', action) => {
  switch (action.type) {
    case 'VALUE_CHANGED':
      return action.payload;
    default:
      return state;
  }
}

const search = combineReducers({
  suggestions,
  value
});

export default search;
