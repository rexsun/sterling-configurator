import { SETCURRENTSTEP } from "./constants";

export function setCurrentStep(step) {
  return {
    type: SETCURRENTSTEP.SUCCESS,
    payload: { step }
  };
}
