const { parseFlags } = require("./helpers/parseFlags");
const { assertIndex, assert } = require("./helpers/assert");
const fs = require("fs");

const flags = parseFlags(process.argv.slice(2));

const embedArg = flags.find((flag) => flag[0] === "-e");
const coverArg = flags.find((flag) => flag[0] === "-c");
const outputArg = flags.find((flag) => flag[0] === "-o");

const embedPath = embedArg && embedArg[1];
if (!embedPath) {
  throw new Error("Provide an embed path with -e");
}

const coverPath = coverArg && coverArg[1];
if (!coverPath) {
  throw new Error("Provide a cover path with -c");
}

const outputPath = outputArg && outputArg[1];
if (!outputPath) {
  throw new Error("Provide an output path with -o");
}

const ZERO_WIDTH_NON_JOINER = "\u200C";
const ZERO_WIDTH_SPACE = "\u200B";
const ZERO_WIDTH_JOINER = "\u200D";

// The hidden message will start and end with the discovery flag
const DISCOVERY_FLAG = [
  ZERO_WIDTH_SPACE,
  ZERO_WIDTH_JOINER,
  ZERO_WIDTH_SPACE,
  ZERO_WIDTH_NON_JOINER,
  ZERO_WIDTH_SPACE,
].join("");

const ONE = ZERO_WIDTH_SPACE;
const ZERO = ZERO_WIDTH_NON_JOINER;

const cover = fs.readFileSync(coverPath, "utf8");
const embed = fs.readFileSync(embedPath);
const embedHex = embed.toString("hex");

let hexified = "";

embedHex.split("").forEach((char) => {
  const binary = parseInt(char, 16).toString(2).padStart(4, "0");
  binary.split("").forEach((bit) => {
    hexified += bit === "1" ? ONE : ZERO;
  });
});

const output =
  cover.slice(0, 1) +
  DISCOVERY_FLAG +
  hexified +
  DISCOVERY_FLAG +
  cover.slice(1);

fs.writeFileSync(outputPath, output);
