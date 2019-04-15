import axios from "axios";

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";

export const fetchData = () => dispatch => {
  dispatch({ type: FETCH_START });
  axios
    .get("http://localhost:5000/api/players")
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
    });
};

export const SEARCH_PLAYER = "SEARCH_PLAYER";
export const SEARCH_PLAYER_SUCCESS = "SEARCH_PLAYER_SUCCESS";
export const SEARCH_PLAYER_FAILURE = "SEARCH_PLAYER_FAILURE";

export const searchPlayers = string => dispatch => {
  dispatch({ type: SEARCH_PLAYER, string });
};
