import expect from "must"
import sinon from "sinon"
import { clearSuggestions, fetchSuggestions, suggestionSelected, valueChanged } from "../../../main/javascript/actions/searchActions"

describe("searchActions", () => {

  let server;

  beforeEach(() => {
    server = sinon.fakeServer.create();
  })

  afterEach(() => {
    server.restore();
  })

  describe("clearSuggestions", () => {
    it("should emit an action of type SUGGESTIONS_CLEARED", () => {
      const action = clearSuggestions()
      expect(action.type).to.eql('SUGGESTIONS_CLEARED');
    });
  });

  describe("fetchSuggestions", () => {
    it("should fetch suggestions from /api/search", () => {

      const suggestionsResponse = [
        { id: "123", name: "Donald Trump", handle: "realDonaldTrump", profile_pic: "img1" },
        { id: "456", name: "Donald Draper", handle: "donDraper", profile_pic: "img2" }
      ];
      const dispatch = sinon.spy()

      server.respondWith("GET", "/api/search?q=Don",
         [200, { "Content-Type": "application/json" }, JSON.stringify(suggestionsResponse)]);


      fetchSuggestions("Don")(dispatch);
      server.respond();

      expect(dispatch.firstCall.args[0]).to.eql({
        type: "SUGGESTIONS_FETCHED",
        payload: suggestionsResponse
      });
    })
  });

  describe("valueChanged", () => {
    it("should emit an action of type VALUE_CHANGED", () => {
      const action = valueChanged("Don");

      expect(action).to.eql({
        type: "VALUE_CHANGED",
        payload: "Don"
      });
    })
  });
});
