import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import { fetchData } from "../actions";

import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

import Input from "@material-ui/core/Input";

import Loader from "react-loader-spinner";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  toolbarMain: {
    background: theme.palette.grey[100],
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  toolbarTitle: {
    flex: 1,
    textDecoration: "underline"
  },
  toolbarSecondary: {
    justifyContent: "space-between"
  },

  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.common.black,
    marginBottom: theme.spacing.unit * 4,
    minHeight: 500,
    padding: "20px",
    display: "flex"
  },
  mainFeaturedPostContent: {
    textAlign: "center",
    margin: "0 auto",
    maxWidth: 500,
    padding: `${theme.spacing.unit * 2}px`,
    [theme.breakpoints.up("md")]: {
      padding: `${theme.spacing.unit * 6}px`
    },
    background: "#fcfcfc",
    boxShadow: "0 8px 24px 0 rgba(0, 0, 0, 0.35)",
    borderRadius: 8
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3
  },
  card: {
    display: "flex",
    background: "#fcfcfc",
    boxShadow: "0 8px 24px 0 rgba(0, 0, 0, 0.35)"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`
  }
});

class PlayerPage extends React.Component {
  state = {
    open: true,
    player: null,
    search: ""
  };

  componentDidMount() {
    if (!this.props.players.length) {
      this.props.fetchData();
    }

    const playerID = this.props.match.params.id;
    console.log(playerID);

    axios
      .get(`https://nbacareers.herokuapp.com/api/players/${playerID}`)
      .then(res => {
        console.log(res);
        this.setState({
          player: res.data
        });
      });
  }

  handleChanges = e => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  randomizePlayer = () => {
    const randomID = Math.floor(
      Math.random() * Math.floor(this.props.playerCount)
    );
    axios
      .get(`https://nbacareers.herokuapp.com/api/players/${randomID}`)
      .then(res => {
        console.log(res);
        if (res.data.predictions === 0) {
          this.randomizePlayer();
        } else {
          this.setState({
            player: res.data
          });
        }
      })
      .catch(err => console.log(err));
  };

  submitSearch = e => {
    console.log(this.state.search);
    const foundPlayer = this.props.players.find(player =>
      player.player.toLowerCase().includes(this.state.search.toLowerCase())
    );
    console.log(foundPlayer);
    if (foundPlayer) {
      this.props.history.push(`/player/${foundPlayer.id}`);
    }
  };

  logout = e => {
    localStorage.removeItem("token");
    this.props.history.push("login");
  };

  render() {
    const { classes } = this.props;

    const currPlayer = this.state.player;

    const PlayerContent = () => {
      if (!currPlayer) {
        return (
          <Loader
            type="Ball-Triangle"
            color="#FA8320"
            height={300}
            width={300}
          />
        );
      } else {
        return (
          <>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              item
              md={6}
            >
              <div className={classes.mainFeaturedPostContent}>
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  {currPlayer ? currPlayer.player : "Loading..."}
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  {currPlayer &&
                    currPlayer.height &&
                    `${currPlayer.height}, ${currPlayer.weight} lbs`}
                  <br />
                  {currPlayer &&
                    currPlayer.draftYear &&
                    `${currPlayer.draftYear} Draft, Pick #${currPlayer.pick}`}
                </Typography>
              </div>
            </Grid>
            <Grid
              container
              direction="row"
              jusitfy="center"
              alignItems="center"
              item
              md={6}
            >
              <div className={classes.mainFeaturedPostContent}>
                <Typography
                  component="h2"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  Prediction
                </Typography>
                <Typography component="h4" variant="h5" color="inherit">
                  {currPlayer.predictions
                    ? `${currPlayer.predictions} year NBA career`
                    : "Insufficient data available"}
                </Typography>
              </div>
            </Grid>
          </>
        );
      }
    };

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.layout}>
          <Toolbar className={classes.toolbarMain}>
            <Typography
              component="h2"
              variant="h4"
              color="inherit"
              align="center"
              noWrap
              className={classes.toolbarTitle}
            >
              NBA Career Predictor
            </Typography>
            <form onSubmit={this.submitSearch}>
              <Input onChange={this.handleChanges} name="search" />
              <IconButton onClick={this.submitSearch}>
                <SearchIcon />
              </IconButton>
            </form>
            {/* <Button onClick={this.logout} variant="outlined" size="small">
              Log Out
            </Button> */}
          </Toolbar>

          <main>
            {/* Main featured post */}
            <Paper className={classes.mainFeaturedPost}>
              <Grid container direction="row">
                <PlayerContent />
              </Grid>
            </Paper>
            {/* End main featured post */}
          </main>
        </div>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={this.randomizePlayer}
          className={classes.randomButton}
        >
          Random Player
        </Button>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Copyright 2019, NBACP Team
          </Typography>
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  players: state.players,
  playerCount: state.playerCount
});

export default connect(
  mapStateToProps,
  { fetchData }
)(withStyles(styles)(PlayerPage));
