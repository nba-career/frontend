import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  SEARCH_PLAYER
} from "../actions";

const initialState = {
  players: [],
  isFetching: false,
  isSearching: false,
  err: null
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
        players: action.players
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
    default:
      return state;
  }
};

export default rootReducer;
