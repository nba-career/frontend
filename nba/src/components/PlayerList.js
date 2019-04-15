import React from "react";
import { connect } from "react-redux";

import { fetchData, searchPlayers } from "../actions";

import Player from "./Player";

class PlayerList extends React.Component {
  state = {
    searchedPlayer: null
  };

  componentDidMount() {
    this.props.fetchData();
  }

  handleChanges = e => {
    let value = e.target.value;
    this.setState({
      searchedPlayer: value
    });
    console.log(this.state);
  };

  filterPlayers = e => {
    e.preventDefault();
    this.props.searchPlayers(this.state.searchedPlayer);
    e.target.reset();
  };

  render() {
    if (!this.props.players.length) {
      return <div>Loading...</div>;
    }
    return (
      <div className="playerList">
        <form onSubmit={this.filterPlayers} className="playerSearch">
          <input
            type="search"
            onChange={this.handleChanges}
            placeholder="Enter player name here..."
          />
        </form>
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
  { fetchData, searchPlayers }
)(PlayerList);
