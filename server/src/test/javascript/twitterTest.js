import twitter from "../../main/javascript/twitter"
import expect from "must"
import sinon from "sinon"

describe("twitter", () => {

  let stub;

  afterEach(() => {
    stub && stub.restore();
  })

  describe("users", () => {
    it("calls the user lookup api and transforms results", (done) => {
      const response = [
        { id_str: "1",
          name: "Some user",
          screen_name: "someUser",
          profile_image_url: "somepic.png"
        }
      ];

      stub = respondTo("/users/lookup.json", response);

      twitter.getUsers("someUser", () => { done("error")}, (results) => {
        expect(results).to.eql([{
          id: "1",
          name: "Some user",
          handle: "someUser",
          profile_pic: "somepic.png"
        }]);

        done();
      });
    });

    it("calls the error handler if the request is not successful", (done) => {
      stub = respondError('/users/lookup.json', "not found");

      twitter.getUsers("someUser", (error) => {
        expect(error).to.eql({
          message: "not found"
        });

        done();

      }, () => { done("error") });
    });
  })

  describe("search", () => {
    it("calls the search api and transforms results", (done) => {

      const response = [
        { id_str: "1",
          name: "Some user",
          screen_name: "someUser",
          profile_image_url: "somepic.png"
        }
      ]

      stub = respondTo('/users/search.json', response);

      twitter.search("user", () => { done("error") }, (results) => {
        expect(results).to.eql([{
          id: "1",
          name: "Some user",
          handle: "someUser",
          profile_pic: "somepic.png"
        }]);

        done();
      });
    });

    it("calls the error handler if the request is not successful", (done) => {
      stub = respondError('/users/search.json', "not found");

      twitter.search("user", (error) => {
        expect(error).to.eql({
          message: "not found"
        });

        done();

      }, () => { done("error") });
    });
  });

  function respondTo(url, response) {
    return sinon.stub(twitter.client, 'getCustomApiCall', function(path, params, error, success) {
      if (path === url) {
        success(JSON.stringify(response));
      } else {
        error("error");
      }
    })
  }

  function respondError(url, message) {
    return sinon.stub(twitter.client, 'getCustomApiCall', function(path, params, error, success) {
      if (path === url && error) {
        error({message});
      } else {
        error("error");
      }
    })
  }
});
