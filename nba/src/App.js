import React, { Component } from "react";

import "./App.css";
import PlayerList from "./components/PlayerList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <a href="#">Home</a>
        </nav>
        <PlayerList />
      </div>
    );
  }
}

export default App;
