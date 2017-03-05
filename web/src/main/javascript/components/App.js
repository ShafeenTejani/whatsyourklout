import React from "react"
import { connect } from "react-redux"

import Search from "./Search"
import User from "./User"


export const App = (props) => (
  <div className="app-root">
    <Search/>
    { props.user.selected ? <User user={props.user}/> : <div className="select-user-message"></div>}
  </div>
);

export default connect(
  (s) => s,
  () => ({}))(App);
