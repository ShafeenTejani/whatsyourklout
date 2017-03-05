import expect from "must"
import reducer from "../../../main/javascript/reducers/user"

describe("userReducer", () => {
  it("should set up the inital state", () => {
      const state = reducer({}, {});
      expect(state).to.eql({
        selected: null,
        klout: null
      });
  });

  it("should store the selected user when receiving a USER_SELECTED action", () => {
    const initialState = {
      selected: null,
      klout: null
    };

    const user = { id: "1", name: "First", handle: "theFirst", profile_pic: "first.png" };

    const state = reducer(initialState, { type: "USER_SELECTED", payload: user });

    expect(state).to.eql({
      selected: user,
      klout: null
    });
  });

  it("should clear the klout when a new user is selected", () => {
    const initialState = {
      selected: null,
      klout: { score: 99 }
    };

    const state = reducer(initialState, { type: "USER_SELECTED", payload: { id: "1" } });

    expect(state.klout).to.eql(null);
  });

  it("should store the klout when receiving a KLOUT_FETCHED action", () => {
    const initialState = {
      selected: { id: "1" },
      klout: null
    };

    const klout = {
      score: 1.0,
      influence: {
        myInfluencers: ["A", "B"],
        myInfluencees: ["C", "D"]
      }
    };

    const state = reducer(initialState, { type: "KLOUT_FETCHED", payload: klout });

    expect(state).to.eql({
      selected: { id: "1" },
      klout: klout
    });
  });

  it("should store a failure state for klout when receiving a KLOUT_FETCH_FAILED action", () => {
    const initialState = {
      selected: { id: "1" },
      klout: null
    };

    const state = reducer(initialState, { type: "KLOUT_FETCH_FAILED" });

    expect(state).to.eql({
      selected: { id: "1" },
      klout: { failed: true }
    });
  });
});
