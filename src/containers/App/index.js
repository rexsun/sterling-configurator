import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import NotFoundPage from "../NotFound/Loadable";

import { routes, routesMap, ROUTE_STEP_01 } from "../../constant/route";
import LoadingScreen from "../Loading";

export default function App() {
  return (
    <div className="sterling-configurator">
      <LoadingScreen />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to={routesMap[ROUTE_STEP_01].path} />}
        />
        {Object.keys(routes).map(route => (
          <Route
            key={route}
            exact
            path={routes[route].path}
            component={routes[route].component}
          />
        ))}
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
