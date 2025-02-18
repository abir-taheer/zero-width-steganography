const { parseFlags } = require("./helpers/parseFlags");
const { assert } = require("./helpers/assert");
const fs = require("fs");

const flags = parseFlags(process.argv.slice(2));

const embedArg = flags.find((flag) => flag[0] === "-e")?.at(1);
assert(embedArg, "Provide an embed path with -e");

const coverArg = flags.find((flag) => flag[0] === "-c")?.at(1);
assert(coverArg, "Provide a cover path with -c");

const outputArg = flags.find((flag) => flag[0] === "-o")?.at(1);
assert(outputArg, "Provide an output path with -o");

const { DISCOVERY_FLAG, END_FLAG, BASE_4_TO_ZERO_WIDTH } = require("./chars");

const cover = fs.readFileSync(coverArg, "utf8");
const embed = fs.readFileSync(embedArg);

let zero_widthified = "";

embed.forEach((val) => {
  const base4 = val.toString(4).padStart(4, "0");

  base4.split("").forEach((base_4_char) => {
    zero_widthified += BASE_4_TO_ZERO_WIDTH[base_4_char];
  });
});

const output =
  cover.slice(0, 1) +
  DISCOVERY_FLAG +
  zero_widthified +
  END_FLAG +
  cover.slice(1);

fs.writeFileSync(outputArg, output);
