import React from "react"
import { connect } from "react-redux"

import Search from "./Search"
import User from "./User"


export const App = (props) => (
  <div>
    <Search/>
    { props.user.selected ? <User user={props.user}/> : <div className="select-user-message">Select a user</div>}
  </div>
);

export default connect(
  (s) => s,
  () => ({}))(App);
