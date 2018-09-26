import _ from "lodash";
import Loading from "../containers/Loading";
import ConfigureOptions from "../containers/ConfigureOptions/Loadable";
import ConfigurePackages from "../containers/ConfigurePackages/Loadable";
import ConfigureAgreements from "../containers/ConfigureAgreements/Loadable";
import ConfigureSecrets from "../containers/ConfigureSecrets/Loadable";
import ThankYou from "../containers/ThankYou/Loadable";

export const ROUTE_STEP_01 = "step1";
export const ROUTE_STEP_02 = "step2";
export const ROUTE_STEP_03 = "step3";
export const ROUTE_STEP_04 = "step4";
export const ROUTE_STEP_05 = "step5";
export const ROUTE_LOADING = "loading";

export const routes = {
  [ROUTE_STEP_01]: {
    path: "/step1",
    component: ConfigureOptions
  },
  [ROUTE_STEP_02]: {
    path: "/step2",
    component: ConfigurePackages
  },
  [ROUTE_STEP_03]: {
    path: "/step3",
    component: ConfigureAgreements
  },
  [ROUTE_STEP_04]: {
    path: "/step4",
    component: ConfigureSecrets
  },
  [ROUTE_STEP_05]: {
    path: "/step5",
    component: ThankYou
  },
  [ROUTE_LOADING]: {
    path: "/loading",
    component: Loading
  }
};

export const routesMap = _.mapValues(routes, (val, key) =>
  _.get(routes, [key], {})
);
