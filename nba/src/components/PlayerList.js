import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import { fetchData, searchPlayers } from "../actions";

import Player from "./Player";

class PlayerList extends React.Component {
  state = {
    searchedPlayer: null,
    teams: null
  };

  componentDidMount() {
    this.props.fetchData();
    axios
      .get("http://localhost:5000/api/teams")
      .then(res => {
        this.setState({ teams: res.data });
      })
      .catch(err => console.log(err));
    console.log(this.state);
  }

  handleChanges = e => {
    let value = e.target.value;
    this.setState({
      searchedPlayer: value
    });
  };

  filterPlayers = e => {
    e.preventDefault();
    this.props.searchPlayers(this.state.searchedPlayer);
    e.target.reset();
    console.log(this.state);
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
        <select>
          {this.state.teams ? (
            this.state.teams.map((team, index) => (
              <option key={index} value={team.team}>
                {team.team}
              </option>
            ))
          ) : (
            <option>Loading...</option>
          )}
        </select>
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
