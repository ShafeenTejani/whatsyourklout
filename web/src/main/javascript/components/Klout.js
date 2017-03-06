import React from "react";
import { connect } from "react-redux"

import { userSelected } from "../actions/userActions"

const format = (score) => (
  score.toFixed(1)
);

export const Klout = ({score, influence, onUserSelected}) => (
  <div>
    <div className="card">
      <div className="klout-score">
        <div className="klout-score-label card-label">Klout score</div>
        <div className="klout-score-value">{format(score)}</div>
      </div>
    </div>
    <div className="klout-influence">
      <div className="card">
        <div className="top-influencers">
          <div className="card-label">Top Influencers</div>
          <Influences influences={influence.myInfluencers} onUserSelected={onUserSelected}/>
        </div>
      </div>
      <div className="card">
        <div className="top-influencees">
          <div className="card-label">Top Influencees</div>
          <Influences influences={influence.myInfluencees} onUserSelected={onUserSelected}/>
        </div>
      </div>
    </div>
  </div>
);

const Influences = ({influences, onUserSelected}) => (
  <div className="influence-container">
    {influences.filter(i => i.user).map(i => (
        <div key={i.id} className="influence-item" onClick={() => {
          onUserSelected(i.user);
        }}>
          <div className="profile-pic"><img src={i.user.profile_pic}/></div>
          <div className="user-container">
            <div className="name">{i.user.name}</div>
            <div className="handle">@{i.user.handle}</div>
          </div>
          <div className="klout-score-value">{format(i.score)}</div>
        </div>
      ))}
  </div>
);


const mapDispatchToProps = (dispatch) => {
  return {
    onUserSelected: (user) => {
      dispatch(userSelected(user))
    }
  }
};

export default connect(
  () => ({}),
  mapDispatchToProps
)(Klout);
