export const last = args => {
  if (args.length < 2) return null;
  const l = args.length - 1;
  if (typeof args[l] === 'string') {
    return args[l].toLowerCase();
  }
  return null;
};
