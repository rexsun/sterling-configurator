import Options from "../containers/Options/Loadable";

export const ROUTE_STEP_01 = "step1";

export const routes = {
  step1: {
    path: "/step1",
    component: Options
  }
};

export const routesMap = {
  [ROUTE_STEP_01]: routes.step1
};
