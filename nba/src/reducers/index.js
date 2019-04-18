import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  SEARCH_PLAYER,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions";

const initialState = {
  players: [],
  playerCount: 0,
  isFetching: false,
  isSearching: false,
  isLoggingIn: false,
  isRegisteringUser: false,
  err: null,
  token: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        players: action.players,
        playerCount: action.players.length
      };
    case FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        err: action.err
      };
    case SEARCH_PLAYER:
      console.log(action.string);
      console.log(state.players.map(player => player.player));
      const filteredPlayers = state.players.filter(player =>
        player.player.toLowerCase().includes(action.string)
      );
      return {
        ...state,
        players: filteredPlayers
      };
    case LOGIN_START:
      return {
        ...state,
        isLoggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false
      };
    default:
      return state;
  }
};

export default rootReducer;
