import { FETCH_START, FETCH_SUCCESS, FETCH_FAILURE } from "../actions";

const initialState = {
  players: [{ name: "Steph Curry", id: 0 }],
  isFetching: false,
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
    default:
      return state;
  }
};

export default rootReducer;
