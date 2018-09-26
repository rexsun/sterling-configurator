import _ from "lodash";

export function createConstants(base) {
  return _.reduce(
    ["REQUEST", "SUCCESS", "FAILURE"],
    (map, val) => {
      _.set(map, val, `${base}_${val}`);
      return map;
    },
    {}
  );
}
