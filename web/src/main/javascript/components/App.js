import React from "react"
import { connect } from "react-redux"

import Search from "./Search"
import User from "./User"


export const App = (props) => (
  <div className="app-root">
    <div className="header">
      <div className="title">{"What's Your Klout?"}</div>
      <div className="description">
      Find out how much <a href="https://klout.com/home" target="_blank">Klout</a> you have. Who are the people that influence you the most and who do you have a lot of sway over?
      </div>
    </div>

    <Search/>
    { props.user.selected ? <User user={props.user}/> : <div className="select-user-message"></div>}
    <div id="footer">Created by <a className="handle" target="_blank" href="https://twitter.com/ShafeenTejani">@ShafeenTejani</a></div>
  </div>
);

export default connect(
  (s) => s,
  () => ({}))(App);
