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
        { "id_str": "123", "name": "Donald Trump", screen_name: "realDonaldTrump", profile_image_url: "img1" },
        { "id_str": "456", "name": "Donald Draper", screen_name: "donDraper", profile_image_url: "img2"}
      ];
      const dispatch = sinon.spy()

      server.respondWith("GET", "/api/search?q=Don",
         [200, { "Content-Type": "application/json" }, JSON.stringify(suggestionsResponse)]);


      fetchSuggestions("Don")(dispatch);
      server.respond();

      expect(dispatch.firstCall.args[0]).to.eql({
        type: "SUGGESTIONS_FETCHED",
        payload: suggestionsResponse.map(toResult)
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


const toResult = (r) => ({
  name: r.name,
  id: r.id_str,
  handle: r.screen_name,
  profile_pic: r.profile_image_url
});
