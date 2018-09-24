import _ from "lodash";
import Options from "../containers/Options/Loadable";
import Loading from "../containers/Loading";

export const ROUTE_STEP_01 = "step1";
export const ROUTE_LOADING = "loading";

export const routes = {
  [ROUTE_STEP_01]: {
    path: "/step1",
    component: Options
  },
  [ROUTE_LOADING]: {
    path: "/loading",
    component: Loading
  }
};

export const routesMap = _.map(routes, (val, key) => _.get(routes, [key], {}));
