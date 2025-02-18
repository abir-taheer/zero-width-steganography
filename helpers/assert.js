const assert = (val, message) => {
  if (!val) {
    throw new Error(message);
  }
};

const assertIndex = (val, message) => {
  if (val === -1) {
    throw new Error(message);
  }
};

module.exports = { assertIndex };
