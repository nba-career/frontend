import axios from "axios";

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";

export const fetchData = () => dispatch => {
  dispatch({ type: FETCH_START });
  return (
    axios
      // .get("https://nbacareers.herokuapp.com/api/players/")
      // Switching to names api for faster initial load, focusing on single player returns using id from this list
      .get("https://nbacareers.herokuapp.com/api/players/names")
      .then(res => {
        console.log(res);
        dispatch({
          type: FETCH_SUCCESS,
          players: res.data
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: FETCH_FAILURE,
          err
        });
      })
  );
};

export const SEARCH_PLAYER = "SEARCH_PLAYER";
export const SEARCH_PLAYER_SUCCESS = "SEARCH_PLAYER_SUCCESS";
export const SEARCH_PLAYER_FAILURE = "SEARCH_PLAYER_FAILURE";

export const searchPlayers = string => dispatch => {
  dispatch({ type: SEARCH_PLAYER, string });
};

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const login = credentials => dispatch => {
  dispatch({ type: LOGIN_START });
  console.log(credentials);
  return axios
    .post("https://nbacareers.herokuapp.com/api/auth/login/", credentials)
    .then(res => {
      console.log(res);
      localStorage.token = res.data.token;
      dispatch({
        type: LOGIN_SUCCESS,
        token: res.data.token,
        message: res.data.message
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: LOGIN_FAILURE,
        err
      });
    });
};

export const REGISTER_USER_START = "REGISTER_USER_START";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";

export const registerUser = credentials => dispatch => {
  dispatch({ type: REGISTER_USER_START });
  console.log(credentials);
  return axios
    .post("https://nbacareers.herokuapp.com/api/auth/register", credentials)
    .then(res => {
      console.log(res);
      dispatch({
        type: REGISTER_USER_SUCCESS
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: REGISTER_USER_FAILURE,
        err
      });
    });
};
