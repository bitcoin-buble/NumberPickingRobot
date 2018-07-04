const fs = require("fs");
const axios = require("axios");
const moment = require("moment");
const hash = require("hash.js");
const { flow, slice, join, reverse, get } = require("lodash/fp");
const contestants = [
  "Swampy Bits",
  "Myphatarz",
  "CryptoAnubis",
  "Pepper Plant Pants"
];
const sponsor = undefined;

const verifyAuthenticityOfDraw = async () => {
  const { data: getInfoResponse } = await axios.get(
    "https://blockexplorer.com/api/status?getinfo"
  );

  const info = getInfoResponse.info;

  const { data: getBlockIndex } = await axios.get(
    `https://blockexplorer.com/api/block-index/${info.blocks}`
  );

  const lastBitOfHash = flow(
    reverse,
    slice(0, 6),
    reverse,
    join(", ")
  )(getBlockIndex.blockHash);

  const output = `The date and time sponsored by ${sponsor} is ${moment().format(
    "dddd, MMMM Do YYYY, h:mm:ss a"
  )} (UK time). The current block height on bitcoin is ${
    info.blocks
  } with a hash ending in ${lastBitOfHash}`;

  fs.writeFileSync("./hash.txt", getBlockIndex.blockHash);

  return output;
};

const pickWinner = () => {
  const blockHash = fs.readFileSync("./hash.txt", "utf8");
  // console.log(blockHash);
  let winner;
  let nonce = 0;

  while (!winner) {
    const strToHash = `${blockHash}-${nonce}`;
    // console.log(strToHash);

    const hashOfHash = hash
      .sha256()
      .update(strToHash)
      .digest("hex");

    const char = slice(0, 1, hashOfHash);
    // console.log(hashOfHash, char);
    winner = get(char, contestants);
    nonce++;
  }

  return winner;
};

const readContestants = () => {
  const contestantsStr = join(", ", contestants).replace(/,(?=[^,]*$)/, " and");
  return `Our contestants this week are ${contestantsStr}. I love you all.`;
};

const steps = {
  intro: () =>
    "Sorry, I went full autist last week and I didn't explain very well how this shit works. The T L D R is that it uses the same cryptographic algorithm as the bitcoin blockchain to generate a random number. I also failed to mention that we have a spot open to sponsor the robot. Get in touch if you're interested",
  verify: verifyAuthenticityOfDraw,
  contestants: readContestants,
  compIntro: () => "Contestants, are you ready?",
  winnerIntro: () => "Sha, sha, sha, 2 5 6, And the winner is...",
  winner: pickWinner
};

const run = async step => {
  const say = await steps[step]();
  console.log(say);
};

const step = process.argv[2];
run(step);
