import React from "react";
import { connect } from "react-redux";

import { fetchData } from "../actions";

import Player from "./Player";

class PlayerList extends React.Component {
  state = {};

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    if (!this.props.players.length) {
      return <div>Loading...</div>;
    }
    return (
      <div className="playerList">
        {this.props.players.map(player => (
          <Player key={player.id} player={player} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  players: state.players
});

export default connect(
  mapStateToProps,
  { fetchData }
)(PlayerList);
