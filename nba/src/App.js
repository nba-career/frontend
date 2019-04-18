import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";
import PlayerList from "./components/PlayerList";
import PlayerPage from "./components/PlayerPage";
import PlayerPageTwo from "./components/PlayerPageTwo";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Survival from "./components/Survival";
import TeamPage from "./components/TeamPage";

import PrivateRoute from "./utils";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <Link to="/register">New User?</Link>
            <Link to="/login">Login</Link>

            <Link to="/player">Random Player</Link>
            <Link to="/player/500">Specific Player</Link>
            <Link to="/survival">Survival by Era</Link>
            <Link to="/team/1">Team Page</Link>
          </nav>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />

          <PrivateRoute path="/player/:id" component={PlayerPage} />
          <PrivateRoute exact path="/player" component={PlayerPageTwo} />
          <PrivateRoute path="/team/:id" component={TeamPage} />
          <PrivateRoute path="/survival" component={Survival} />
        </div>
      </Router>
    );
  }
}

export default App;
