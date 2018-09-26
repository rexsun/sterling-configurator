import immutable from "immutability-helper";
import { createReducer } from "../../utils/helpers";
import { SETCURRENTSTEP } from "./constants";

export const localState = {
  currentStep: 2,
  configuration: {}
};

const reducer = createReducer(localState, {
  [SETCURRENTSTEP.SUCCESS](state, { payload }) {
    return immutable(state, {
      currentStep: { $set: payload.step }
    });
  },
  [SETCURRENTSTEP.FAILURE](state, { payload }) {
    return immutable(state, {
      currentStep: { $set: payload.step }
    });
  }
});

export default reducer;
