import _ from "lodash";
import { fromJS } from "immutable";
import { combineReducers } from "redux-immutable";
import { LOCATION_CHANGE } from "react-router-redux";

const routeInitialState = fromJS({
  location: null
});

export function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({ location: action.payload });
    default:
      return state;
  }
}

export default function createReducer(injectedReducers) {
  return combineReducers(_.merge({ route: routeReducer }, injectedReducers));
}
