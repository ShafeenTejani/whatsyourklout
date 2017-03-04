import ReactDOM from "react-dom"
import React from "react"
import nanoajax from "nanoajax"

import App from "./components/App"

const url = "/api/user?name=POTUS";
nanoajax.ajax({url}, (code, response) => {
    if (code == 200) {
      const user = JSON.parse(response);
      ReactDOM.render(<App user={user}/>, document.getElementById('root'));
    } else {
      console.log("Error")
    }
});
