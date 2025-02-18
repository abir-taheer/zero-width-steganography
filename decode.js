const { parseFlags } = require("./helpers/parseFlags");
const { assert, assertIndex } = require("./helpers/assert");
const fs = require("fs");

const flags = parseFlags(process.argv.slice(2));

const embedArg = flags.find((flag) => flag[0] === "-s")?.at(1);
assert(embedArg, "Provide an steg file path with -s");

const outputArg = flags.find((flag) => flag[0] === "-o")?.at(1);
assert(outputArg, "Provide an output path with -o");

const { DISCOVERY_FLAG, END_FLAG, ZERO_WIDTH_TO_BASE_4 } = require("./chars");

const steg = fs.readFileSync(embedArg, "utf8");

const startIndex = steg.indexOf(DISCOVERY_FLAG);
const endIndex = steg.indexOf(END_FLAG);
assertIndex(startIndex, "Invalid steg file");
assertIndex(endIndex, "Invalid steg file");

const zero_widthified = steg.slice(
  startIndex + DISCOVERY_FLAG.length,
  endIndex,
);

// Convert zero-width characters back to base 4 digits
let base4String = "";
for (let i = 0; i < zero_widthified.length; i++) {
  const char = zero_widthified[i];
  const base4Digit = ZERO_WIDTH_TO_BASE_4[char];
  if (base4Digit !== undefined) {
    base4String += base4Digit;
  }
}

// Convert groups of 4 base-4 digits back to bytes
const bytes = [];
for (let i = 0; i < base4String.length; i += 4) {
  const base4Group = base4String.slice(i, i + 4);
  if (base4Group.length === 4) {
    const decimal = parseInt(base4Group, 4);
    bytes.push(decimal);
  }
}

const output = Buffer.from(bytes);
fs.writeFileSync(outputArg, output);
