import { combineReducers } from 'redux'

const selected = (state = null, action) => {
  switch (action.type) {
    case 'USER_SELECTED':
      return action.payload;
    default:
      return state;
  }
};

const klout = (state = null, action) => {
  switch (action.type) {
    case 'USER_SELECTED':
      return null;
    case 'KLOUT_FETCHED':
      return action.payload;
    case 'KLOUT_FETCH_FAILED':
      return { failed: true };
    default:
      return state;
  }
};

const user = combineReducers({
  selected,
  klout
});

export default user;
