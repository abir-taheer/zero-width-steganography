const ZERO_WIDTH_SPACE = "\u200B";
const ZERO_WIDTH_NON_JOINER = "\u200C";
const ZERO_WIDTH_JOINER = "\u200D";
const LTR_MARK = "\u200E";
const RTL_MARK = "\u200F";

// The hidden message will start with the discovery flag end with the end flag
const DISCOVERY_FLAG = [ZERO_WIDTH_SPACE, RTL_MARK].join("");
const END_FLAG = [ZERO_WIDTH_SPACE, LTR_MARK].join("");

const ONE = ZERO_WIDTH_SPACE;
const ZERO = RTL_MARK;

const BASE_4_TO_ZERO_WIDTH = {
  0: ZERO_WIDTH_NON_JOINER,
  1: ZERO_WIDTH_JOINER,
  2: LTR_MARK,
  3: RTL_MARK,
};

const ZERO_WIDTH_TO_BASE_4 = {
  [ZERO_WIDTH_NON_JOINER]: 0,
  [ZERO_WIDTH_JOINER]: 1,
  [LTR_MARK]: 2,
  [RTL_MARK]: 3,
};

module.exports = {
  ZERO_WIDTH_NON_JOINER,
  ZERO_WIDTH_JOINER,
  LTR_MARK,
  RTL_MARK,
  ZERO_WIDTH_SPACE,
  DISCOVERY_FLAG,
  END_FLAG,
  ONE,
  ZERO,
  ZERO_WIDTH_TO_BASE_4,
  BASE_4_TO_ZERO_WIDTH,
};
