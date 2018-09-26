import { List } from "immutable";

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if ({}.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

export function isDataDirty(formList, initialList) {
  const dirtyValues = formList
    .map((values, index) => values.set("formValuesIndex", index))
    .filter((values, index) => {
      const emptyValue = values.size <= 1;
      const newValue = typeof values.get("id") === "undefined";
      let initialVersion;
      if (!newValue) {
        initialVersion = initialList
          .find(
            initialValue => initialValue.get("id") === values.get("id"),
            undefined,
            new List()
          )
          .set("formValuesIndex", index);
      }

      return !emptyValue && (newValue || !values.equals(initialVersion));
    });
  return dirtyValues;
}

export function randomString(
  length,
  chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
) {
  var result = "";
  for (var i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
