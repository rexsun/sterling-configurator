import _ from "lodash";
import { combineReducers } from "redux";
import { LOCATION_CHANGE } from "react-router-redux";

export function routeReducer(state = { location: null }, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return _.merge(state, {
        location: action.payload
      });
    default:
      return state;
  }
}

export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    ...injectedReducers
  });
}
