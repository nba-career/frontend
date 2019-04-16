import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";
import PlayerList from "./components/PlayerList";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <Link to="/register">New User?</Link>
            <Link to="/login">Login</Link>
            <Link to="/player-list">Players</Link>
          </nav>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/player-list" component={PlayerList} />
        </div>
      </Router>
    );
  }
}

export default App;
