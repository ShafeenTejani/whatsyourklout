import React from "react";
import Klout from "./Klout"

const User = ({user}) => (
  <div>
    <UserProfile user={user.selected}/>
    { !user.klout ? <Loading/> :
        user.klout.failed ? <div className="klout-failed">Unable to load klout</div> :
        <Klout {...user.klout}/> }
  </div>
);

const Loading = (props) => (
  <div className="loading"/>
);

const UserProfile = ({user}) => (
  <div>
    <img className="profile-pic" src={user.profile_pic}/>
    <span className="user-name">{user.name}</span>
    <span className="handle">@{user.handle}</span>
  </div>
);

export default User;
