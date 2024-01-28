export const assertValidArgs = (args, expectedLength) => {
  // one more argument for the alpha channel is allowed
  if (args.length < expectedLength || args.length > expectedLength + 1) {
    throw new Error(`invalid number of arguments: ${args}`);
  }
  const alpha = args[expectedLength + 1];
  if (alpha && (alpha < 0 || alpha > 1)) {
    throw new RangeError(`alpha must be between 0 and 1, received ${alpha}`);
  }
};
