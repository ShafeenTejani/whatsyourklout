import React from "react";
import Klout from "./Klout"

const User = ({user}) => (
  <div className="selected-user-container">
    <div className="user-card card">
      <UserProfile user={user.selected}/>
    </div>
    <div className="klout-container">
    { !user.klout ? <Loading/> :
        user.klout.failed ? <KloutFailed/> :
        <Klout {...user.klout}/> }
    </div>
  </div>
);

const KloutFailed = (props) => (
  <div className="klout-failed">
    <div className="card">
      <div>
        <div className="card-label">Klout</div>
        <div className="message">Sorry, no Klout available for this user {'🙈'}</div>
      </div>
    </div>
  </div>
)

const Loading = (props) => (
  <div className="loading"></div>
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
