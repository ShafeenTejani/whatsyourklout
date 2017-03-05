import React from "react";
import Klout from "./Klout"

const User = ({user}) => (
  <div className="selected-user-container">
    <div className="user-card">
      <UserProfile user={user.selected}/>
    </div>
    { !user.klout ? <Loading/> :
        user.klout.failed ? <div className="klout-failed">Unable to load klout</div> :
        <Klout {...user.klout}/> }
  </div>
);

const Loading = (props) => (
  <div className="loading"/>
);

const UserProfile = ({user}) => (
  <div className="user-profile-container">
    <div className="user-profile">
      <div className="profile-pic"><img className="profile-pic" src={user.profile_pic}/></div>
      <div className="user-name-container">
        <div className="user-name">{user.name}</div>
        <div className="handle">@{user.handle}</div>
      </div>
    </div>
  </div>
);

export default User;
