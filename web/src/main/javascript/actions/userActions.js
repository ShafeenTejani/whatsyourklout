import nanoajax from "nanoajax"

export const userSelected = (user) => (dispatch) => {
  dispatch({
    type: "USER_SELECTED",
    payload: user
  });

  nanoajax.ajax({ url: `/api/klout?user=${user.handle}`}, function(code, response) {
    if (code == 200) {
      const klout = JSON.parse(response);
      dispatch({
        type: "KLOUT_FETCHED",
        payload: klout
      });
    } else {
      dispatch({
        type: "KLOUT_FETCH_FAILED"
      })
    }
  });
};
