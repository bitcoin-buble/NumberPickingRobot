const fs = require("fs");
const axios = require("axios");
const moment = require("moment");
const hash = require("hash.js");
const { flow, slice, join, reverse, get } = require("lodash/fp");
const contestants = ["Swampy Bits", "Myphatarz", "Lavisse", "CryptoAnubis"];
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
  return `Our contestants this week are ${join(", ", contestants)}.`;
};

const steps = {
  intro: () =>
    "To verify the date and time of the draw I'm going to query the bitcoin blockchain",
  verify: verifyAuthenticityOfDraw,
  contestants: readContestants,
  compIntro: () =>
    "I have concatenated a little nonce to the hash from the latest bitcoin block and will run this through a sha 2 5 6 function to generate a random number. Contestants, are you ready?",
  winnerIntro: () => "And the winner is...",
  winner: pickWinner
};

const run = async step => {
  const say = await steps[step]();
  console.log(say);
};

const step = process.argv[2];
run(step);
