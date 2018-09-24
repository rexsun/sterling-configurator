import { List } from 'immutable';

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
    .map((values, index) => values.set('formValuesIndex', index)) // We make form changes immediately for responsiveness, but need this to revert them in the unlikely event of a service failure
    .filter((values, index) => {
      const emptyValue = values.size <= 1;
      const newValue = typeof values.get('id') === 'undefined';
      let initialVersion;
      if (!newValue) {
        initialVersion = initialList
          .find(
            initialValue => initialValue.get('id') === values.get('id'),
            undefined,
            new List(),
          )
          .set('formValuesIndex', index);
      }

      return !emptyValue && (newValue || !values.equals(initialVersion));
    });
  return dirtyValues;
}
