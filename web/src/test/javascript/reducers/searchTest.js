import expect from "must"
import reducer from "../../../main/javascript/reducers/search"

describe("searchReducer", () => {
  it("should set up the inital state", () => {
      const state = reducer({}, {});
      expect(state).to.eql({
        suggestions: [],
        value: ""
      });
  });

  it("should update the suggestions on receiving SUGGESTIONS_FETCHED", () => {
    const initialState = {
      suggestions: [],
      value: ""
    };

    const suggestions = [{ id: "1", name: "First"}, { id: "2", name: "Second" }];

    const state = reducer(initialState, { type: "SUGGESTIONS_FETCHED", payload: suggestions});

    expect(state).to.eql({
      suggestions,
      value: ""
    })
  });

  it("should empty the suggestions on receiving SUGGESTIONS_CLEARED", () => {
    const initialState = {
      suggestions: [{ id: "1", name: "First"}, { id: "2", name: "Second" }],
      value: ""
    };

    const state = reducer(initialState, { type: "SUGGESTIONS_CLEARED" });

    expect(state).to.eql({
      suggestions: [],
      value: ""
    })
  });

  it("should update the value on receiving VALUE_CHANGED", () => {
    const initialState = {
      suggestions: [],
      value: ""
    };

    const state = reducer(initialState, { type: "VALUE_CHANGED", payload: "ABC" });

    expect(state).to.eql({
      suggestions: [],
      value: "ABC"
    });
  });

  it("should not change the state when receiving any other action", () => {
    const initialState = {
      suggestions: [{id: "1", name: "First"}],
      value: "ABC"
    };

    const state = reducer(initialState, { type: "SOME_OTHER_ACTION", payload: "123" });

    expect(state).to.eql(initialState);
  });
})
