export const assertArgsLength = (expected, args) => {
  // one more argument for the alpha channel is allowed
  if (args.length < expected || args.length > expected + 1) {
    throw new Error(`invalid number of arguments: ${args}`);
  }
  const alpha = args[expected + 1];
  if (alpha && (alpha < 0 || alpha > 1)) {
    throw new Error(`alpha channel must be between 0 and 1: ${alpha}`);
  }
};
