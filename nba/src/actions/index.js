import axios from "axios";

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";

export const fetchData = () => dispatch => {
  dispatch({ type: FETCH_START });
  axios
    .get("ENDPOINT_GOES_HERE")
    .then(res => {
      console.log(res);
      dispatch({ type: FETCH_SUCCESS, players: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: FETCH_FAILURE,
        err
      });
    });
};
