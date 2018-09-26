import { fromJS } from "immutable";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import createReducer from "./reducers";

export const initState = {
  isLoading: "",
  currentStep: 2,
  configuration: {}
};

export default function configureStore(initialState = initState, history) {
  const middlewares = [routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers = compose;

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  store.injectedReducers = {};

  return store;
}
