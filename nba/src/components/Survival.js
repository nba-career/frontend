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
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import Input from "@material-ui/core/Input";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Loader from "react-loader-spinner";

import graph from "../assets/survival-graph.png";

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
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between"
  },

  mainFeaturedPost: {
    // backgroundColor: theme.palette.grey[800],
    background: "lightgray",
    color: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 4,
    minHeight: "500px"
  },
  mainFeaturedPostContent: {
    padding: theme.spacing.unit * 6,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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

  userInput: {
    background: `${theme.palette.grey[400]}`,
    width: "80%"
  },

  checkboxColumn: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },

  checkbox: {
    color: "white"
  },
  graph: {
    width: "64vw",
    height: "50vw",
    [theme.breakpoints.up("lg")]: {
      width: "54vw",
      height: "43vw"
    }
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

class Survival extends React.Component {
  state = {
    open: true,
    positions: [],
    era: [],
    search: "",
    graph: null,
    title: null
  };

  componentDidMount() {
    // this.props.fetchData().then(res => {
    //   if (!this.state.player) {
    //     console.log(this.props.playerCount);
    //     const randomID = Math.floor(
    //       Math.random() * Math.floor(this.props.playerCount)
    //     );
    //     axios
    //       .get(`https://nbacareers.herokuapp.com/api/players/${randomID}`)
    //       .then(res => {
    //         console.log(res);
    //         this.setState({
    //           player: res.data
    //         });
    //       })
    //       .catch(err => console.log(err));
    //   }
    // });
    // What do we need for the survival mount? Can choose a default combo that seems interesting
    this.props.fetchData();
  }

  handleChangesEra = e => {
    console.log(e.target.checked);
    if (e.target.checked) {
      this.setState({
        ...this.state,
        era: [...this.state.era, Number(e.target.value)]
      });
    } else {
      const eras = this.state.era.filter(
        era => Number(era) !== Number(e.target.value)
      );
      this.setState({
        ...this.state,
        era: eras
      });
    }
    console.log(this.state);
  };

  handleChangesPosition = e => {
    console.log(e.target.checked);
    if (e.target.checked) {
      this.setState({
        ...this.state,
        positions: [...this.state.positions, e.target.value]
      });
    } else {
      const positions = this.state.positions.filter(
        position => position !== e.target.value
      );
      this.setState({
        ...this.state,
        positions: positions
      });
    }
    console.log(this.state);
  };

  handleChanges = e => {
    console.log(e.target.value, this.state.search);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitData = e => {
    e.preventDefault();

    let options = {
      era: this.state.era,
      positions: this.state.positions
    };

    console.log(options);

    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    axios
      .post(proxyurl + `https://nbacareers.herokuapp.com/survival`, options)
      .then(res => {
        console.log(res);

        this.setState({
          graph: `https://nbacareers.herokuapp.com/file/${res.data}`
        });
        console.log(this.state.graph);
      })
      .catch(err => console.log(err));

    this.setState({
      ...this.state,
      title: `Kaplan-Meier Estimate for NBA ${this.state.positions.join(
        ", "
      )} on Roster at Start of First Season in the ${this.state.era.join(
        "s, "
      )}s`
    });
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

  render() {
    const { classes } = this.props;

    const positions = ["G", "F", "C", "F-C", "G-F", "C-F", "F-G"];
    const decades = ["1950", "1960", "1970", "1980", "1990", "2000", "2010"];

    const title = `Kaplan-Meier Estimate for NBA ${this.state.positions.join(
      ", "
    )} on Roster at Start of First Season in ${this.state.era.join(", ")}`;

    const GraphContent = () => {
      if (false) {
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
            {/* <Grid item md={6}>
              <div className={classes.mainFeaturedPostContent}>
                <Typography
                  component="h1"
                  variant="h2"
                  color="inherit"
                  gutterBottom
                >
                  Kaplan-Meier Estimate for NBA Players
                </Typography>
              </div>
            </Grid> */}
            <Grid item>
              <div className={classes.mainFeaturedPostContent}>
                <h2 style={{ color: "black" }}>
                  {this.state.graph && this.state.title}
                </h2>
                <CardMedia
                  className={classes.graph}
                  image={this.state.graph ? this.state.graph : graph}
                />
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
            <Button size="small">Random Player</Button>
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
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item className={classes.userInput}>
                  {/* Should I use a FormControl here? Maybe! */}
                  <form className={classes.checkbox} onSubmit={this.submitData}>
                    <div className={classes.checkboxColumn}>
                      {decades.map((decade, index) => (
                        <FormControlLabel
                          key={index}
                          onChange={this.handleChangesEra}
                          control={
                            <Checkbox
                              className={classes.checkbox}
                              value={decade}
                              color="primary"
                            />
                          }
                          label={decade}
                        />
                      ))}
                    </div>
                    <Divider />
                    <div>
                      {positions.map((position, index) => (
                        <FormControlLabel
                          key={index}
                          onChange={this.handleChangesPosition}
                          control={
                            <Checkbox
                              className={classes.checkbox}
                              value={position}
                              color="primary"
                            />
                          }
                          label={position}
                        />
                      ))}
                    </div>
                    <Button onClick={this.submitData} size="small">
                      Submit
                    </Button>
                  </form>
                </Grid>
                <GraphContent />
              </Grid>
            </Paper>
            {/* End main featured post */}
          </main>
        </div>
      </React.Fragment>
    );
  }
}

// Survival.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

const mapStateToProps = state => ({
  players: state.players,
  playerCount: state.playerCount
});

export default connect(
  mapStateToProps,
  { fetchData }
)(withStyles(styles)(Survival));
