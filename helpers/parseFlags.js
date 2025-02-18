/*
 * @param {Array} args - The arguments passed to the program
 * @returns {Array} - An array of arrays of flags and their values
 */
const parseFlags = (args) => {
  const flags = [];

  args.forEach((arg) => {
    if (arg.startsWith("-")) {
      const [key, value] = arg.split("=");
      const flag = [key];

      if (value) {
        flag.push(value);
      }

      flags.push(flag);
      return;
    }

    const mostRecent = flags[flags.length - 1];

    if (!mostRecent) {
      flags.push([arg]);
      return;
    } else {
      mostRecent.push(arg);
    }
  });

  return flags;
};

module.exports = { parseFlags };
