import React from "react";

const User = ({user}) => (
  <div>
    <UserProfile user={user.selected}/>
    <div>
      Loading klout...
    </div>
  </div>
);


const UserProfile = ({user}) => (
  <div>
    <img className="profile-pic" src={user.profile_pic}/>
    <span className="user-name">{user.name}</span>
    <span className="handle">@{user.handle}</span>
  </div>
);

export default User;
