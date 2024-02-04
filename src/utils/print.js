/**
 * Pretty print an object.
 * Will remove the [] around the stringified JSON.
 */
export const prettyObj = obj => {
  const str = JSON.stringify(obj);
  return str.substring(1, str.length - 1);
};
