import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import createReducer from "./reducers";

export default function configureStore(initialState = {}, history) {
  const middlewares = [routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  const composeEnhancers = compose;

  const store = createStore(createReducer(), composeEnhancers(...enhancers));

  store.injectedReducers = {};

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
