export const to = (input, f) => {
  return Array.isArray(input) ? input.map(c => f(c)) : f(input);
};
