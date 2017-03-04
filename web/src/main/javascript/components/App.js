import React from "react"

const App = ({user}) => (
  <div>
    <div><span>{user.screen_name}</span><span>{user.name}</span></div>
    <div>
      <img src={user.profile_image_url}/><span>{user.description}</span>
    </div>
  </div>
);

export default App;
