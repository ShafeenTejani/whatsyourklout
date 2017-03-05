import expect from "must"
import sinon from "sinon"
import { userSelected } from "../../../main/javascript/actions/userActions"

describe("userActions", () => {

  let server;

  beforeEach(() => {
    server = sinon.fakeServer.create();
  })

  afterEach(() => {
    server.restore();
  })

  describe("userSelected", () => {
    it("should emit an action of type USER_SELECTED", () => {
      const dispatch = sinon.spy()
      const selected = {
        name: "James Bond",
        id: "007",
        handle: "realJamesBond",
        profile_pic: "bond.png"
      }
      userSelected(selected)(dispatch);

      expect(dispatch.firstCall.args[0]).to.eql({
        type: "USER_SELECTED",
        payload: selected
      });
    });

    it("should fetch the user's klout and emit an action of type KLOUT_FETCHED", () => {
      const dispatch = sinon.spy();
      const selected = {
        name: "James Bond",
        id: "007",
        handle: "realJamesBond",
        profile_pic: "bond.png"
      };
      const kloutResponse = {
        score: {
          score: 22.3
        },
        influence: {
          myInfluencers: ["theQueen", "M"],
          myInfluencees: ["006", "005"]
        }
      };

      server.respondWith("GET", "/api/klout?user=realJamesBond",
         [200, { "Content-Type": "application/json" }, JSON.stringify(kloutResponse)]);

      userSelected(selected)(dispatch);

      server.respond();

      expect(dispatch.secondCall.args[0]).to.eql({
        type: "KLOUT_FETCHED",
        payload: kloutResponse
      });
    });
  });
});
