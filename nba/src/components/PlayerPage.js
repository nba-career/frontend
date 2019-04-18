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

import Loader from "react-loader-spinner";
import { FormControl } from "@material-ui/core";

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
            <Grid item md={6}>
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
                    `${currPlayer.height}, ${currPlayer.weight}`}
                </Typography>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className={classes.mainFeaturedPostContent}>
                <Typography component="h2" variant="h3" color="inherit">
                  Prediction: {currPlayer && currPlayer.predictions} year NBA
                  career
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
                <PlayerContent />
              </Grid>
            </Paper>
            {/* End main featured post */}
            {/* Sub featured posts */}
            <Grid container spacing={40} className={classes.cardGrid}>
              {featuredPosts.map(post => (
                <Grid item key={post.title} xs={12} md={6}>
                  <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                      <CardContent>
                        <Typography component="h2" variant="h5">
                          Link Goes Here
                        </Typography>
                      </CardContent>
                    </div>
                    {/* <Hidden xsDown>
                      <CardMedia
                        className={classes.cardMedia}
                        image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                        title="Image title"
                      />
                    </Hidden> */}
                  </Card>
                </Grid>
              ))}
            </Grid>
            {/* End sub featured posts */}
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

// PlayerPage.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

const mapStateToProps = state => ({
  players: state.players,
  playerCount: state.playerCount
});

export default connect(
  mapStateToProps,
  { fetchData }
)(withStyles(styles)(PlayerPage));
