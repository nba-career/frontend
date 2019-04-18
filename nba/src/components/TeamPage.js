import React from "react";
import { connect } from "react-redux";
import axios from "axios";

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

import Loader from "react-loader-spinner";

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
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`
  }
});

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content."
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content."
  }
];

const archives = [
  "March 2020",
  "February 2020",
  "January 2020",
  "December 2019",
  "November 2019",
  "October 2019",
  "September 2019",
  "August 2019",
  "July 2019",
  "June 2019",
  "May 2019",
  "April 2019"
];

const social = ["GitHub", "Twitter", "Facebook"];

class PlayerPageTwo extends React.Component {
  state = {
    teams: null,
    currentTeam: "ATL",
    teamPlayers: null
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
                      {player.player}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="right">
                      {player.predictions}
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
  playerCount: state.playerCount
});

export default connect(
  mapStateToProps,
  { fetchData }
)(withStyles(styles)(PlayerPageTwo));
