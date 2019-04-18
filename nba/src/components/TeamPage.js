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
    backgroundColor: theme.palette.grey[300],
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
  dropdown: {
    display: "block",
    fontSize: 18,
    fontWeight: 700,
    color: "#444",
    lineHeight: 1.3,
    padding: ".6em 1.4em .5em .8em",
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    margin: "20px 60px",
    border: "1px solid #838383",
    boxShadow: "0px 4px 14px -3px rgba(0,0,0,.4)",
    borderRadius: "1em",
    appearance: "none",
    backgroundColor: "#fff",
    backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'), linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%)",
    backgroundRepeat: "no-repeat, repeat",
    backgroundPosition: "right .7em top 50%, 0 0",
    backgroundSize: ".65em auto, 100%"
  },
  table: {
    minWidth: 700
  },
  tableCell: {
    color: "black",
    fontSize: 16
  },
  player: {
    color: "black",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  logo: {
    width: 100,
    height: 100,
    margin: "0 auto"
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
            <select
              className={classes.dropdown}
              onChange={this.updateTeam}
              value={this.state.currentTeam}
            >
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
