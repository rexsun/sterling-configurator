import immutable from "immutability-helper";
import { createReducer } from "../../utils/helpers";
import { SETLOADINGSTATUS } from "./constants";

export const localState = {
  isLoading: false
};

const reducer = createReducer(localState, {
  [SETLOADINGSTATUS.SUCCESS](state, { payload }) {
    return immutable(state, {
      isLoading: { $set: Boolean(payload.loading) }
    });
  },
  [SETLOADINGSTATUS.FAILURE](state, { payload }) {
    return immutable(state, {
      isLoading: { $set: Boolean(payload.loading) }
    });
  }
});

export default reducer;
