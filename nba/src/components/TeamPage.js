import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import { fetchData } from "../actions";

// import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";

import CardMedia from "@material-ui/core/CardMedia";

import Loader from "react-loader-spinner";

import ATL from "../assets/atl-logo.png";
import NJN from "../assets/bkn-logo.png";
import BOS from "../assets/bos-logo.png";
import CHA from "../assets/cha-logo.png";
import CHI from "../assets/chi-logo.png";
import CLE from "../assets/cle-logo.png";
import DAL from "../assets/dal-logo.png";
import DET from "../assets/det-logo.png";
import GSW from "../assets/gsw-logo.png";
import HOU from "../assets/hou-logo.png";
import IND from "../assets/ind-logo.png";
import LAC from "../assets/lac-logo.png";
import LAL from "../assets/lal-logo.png";
import MEM from "../assets/mem-logo.png";
import MIA from "../assets/mia-logo.png";
import MIL from "../assets/mil-logo.png";
import MIN from "../assets/min-logo.png";
import NOH from "../assets/nop-logo.png";
import NYK from "../assets/nyk-logo.png";
import OKC from "../assets/okc-logo.png";
import ORL from "../assets/orl-logo.png";
import PHI from "../assets/phi-logo.png";
import PHO from "../assets/pho-logo.png";
import POR from "../assets/por-logo.png";
import SAC from "../assets/sac-logo.png";
import SAS from "../assets/sas-logo.png";
import SEA from "../assets/sea-logo.png";
import TOR from "../assets/tor-logo.png";
import UTA from "../assets/uta-logo.png";
import WAS from "../assets/was-logo.png";

const styles = theme => ({
  layout: {
    width: "auto",
    overflowX: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between"
  },

  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
    minHeight: "500px",
    padding: "auto"
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing.unit * 6}px`
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 3
  },
  card: {
    display: "flex"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  },
  table: {
    minWidth: 700
  },
  tableCell: {
    color: "white"
  },
  player: {
    color: "white",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  logo: {
    width: 100,
    height: 100,
    margin: 25
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`
  }
});

const logoRefs = {
  ATL,
  NJN,
  BOS,
  CHA,
  CHI,
  CLE,
  DAL,
  DET,
  GSW,
  HOU,
  IND,
  LAC,
  LAL,
  MEM,
  MIA,
  MIL,
  MIN,
  NOH,
  NYK,
  OKC,
  ORL,
  PHI,
  PHO,
  POR,
  SAC,
  SAS,
  SEA,
  TOR,
  UTA,
  WAS
};

const social = ["GitHub", "Twitter", "Facebook"];

class PlayerPageTwo extends React.Component {
  state = {
    teams: null,
    currentTeam: "ATL",
    teamPlayers: null,
    search: ""
  };

  componentDidMount() {
    this.props.fetchData();
    axios
      .get("https://nbacareers.herokuapp.com/api/teams/")
      .then(res => {
        console.log(res);
        this.setState({ teams: res.data });
      })
      .catch(err => console.log(err));
    console.log(this.state);

    this.fetchTeamPlayers(this.state.currentTeam);
  }

  fetchTeamPlayers = team => {
    axios
      .get(`https://nbacareers.herokuapp.com/api/teams/${team}`)
      .then(res => {
        console.log(res);
        this.setState({
          teamPlayers: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChanges = e => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
    this.fetchTeamPlayers();
  };

  randomizePlayer = () => {
    const randomID = Math.floor(
      Math.random() * Math.floor(this.props.playerCount)
    );
    axios
      .get(`https://nbacareers.herokuapp.com/api/players/${randomID}`)
      .then(res => {
        console.log(res);
        this.setState({
          player: res.data
        });
      })
      .catch(err => console.log(err));
  };

  submitSearch = e => {
    e.preventDefault();
    console.log(this.state.search);
    const foundPlayer = this.props.players.find(player =>
      player.player.toLowerCase().includes(this.state.search.toLowerCase())
    );
    console.log(foundPlayer);
    if (foundPlayer) {
      this.props.history.push(`/player/${foundPlayer.id}`);
    }
    e.target.reset();
  };

  updateTeam = e => {
    console.log(e.target.value);
    this.setState({
      currentTeam: e.target.value
    });
    this.fetchTeamPlayers(e.target.value);
  };

  render() {
    const { classes } = this.props;

    const TeamTable = () => {
      if (!this.state.teamPlayers) {
        return (
          <Loader
            type="Ball-Triangle"
            color="#FA8320"
            height={300}
            width={300}
          />
        );
      } else {
        console.log(this.state.currentTeam);
        console.log(logoRefs);
        return (
          <>
            <select onChange={this.updateTeam} value={this.state.currentTeam}>
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
            <CardMedia
              className={classes.logo}
              image={logoRefs[this.state.currentTeam]}
            />
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell}>Player</TableCell>
                  <TableCell className={classes.tableCell} align="right">
                    Predicted Career Length
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.teamPlayers.map(player => (
                  <TableRow key={player.id}>
                    <TableCell
                      className={classes.tableCell}
                      component="th"
                      scope="row"
                    >
                      <Link
                        className={classes.player}
                        to={`/player/${player.id}`}
                      >
                        {player.player}
                      </Link>
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {player.predictions ? player.predictions : "Unknown"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        );
      }
    };

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.layout}>
          <Toolbar className={classes.toolbarMain}>
            <Button size="small" onClick={this.randomizePlayer}>
              Random Player
            </Button>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className={classes.toolbarTitle}
            >
              NBA Career Predictor
            </Typography>
            <form onSubmit={this.submitSearch}>
              <Input onChange={this.handleChanges} name="search" />
              <IconButton>
                <SearchIcon />
              </IconButton>
            </form>
            <Button variant="outlined" size="small">
              Log Out
            </Button>
          </Toolbar>

          <main>
            {/* Main featured post */}
            <Paper className={classes.mainFeaturedPost}>
              <Grid container direction="row">
                <TeamTable />
              </Grid>
            </Paper>
            {/* End main featured post */}
          </main>
        </div>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Need something here; may replicate top nav with different style
          </Typography>
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}

// PlayerPageTwo.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

const mapStateToProps = state => ({
  players: state.players,
  playerCount: state.playerCount
});

export default connect(
  mapStateToProps,
  { fetchData }
)(withStyles(styles)(PlayerPageTwo));
