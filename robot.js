const fs = require("fs");
const axios = require("axios");
const moment = require("moment");
const hash = require("hash.js");
const { flow, slice, join, reverse, get, times } = require("lodash/fp");
const contestants = ["Swampy Bits", "Big Crypto Dave"];
const sponsor = "Dee Cred";

const verifyAuthenticityOfDraw = async () => {
  const { data: getInfoResponse } = await axios.get(
    "https://mainnet.decred.org/api/status?getinfo"
  );

  const info = getInfoResponse.info;

  const { data: getBlockIndex } = await axios.get(
    `https://mainnet.decred.org/api/block-index/${info.blocks}`
  );

  const lastBitOfHash = flow(
    reverse,
    slice(0, 6),
    reverse,
    join(", ")
  )(getBlockIndex.blockHash);

  const output = `The date and time sponsored by ${sponsor} is ${moment().format(
    "dddd, MMMM Do YYYY, h:mm:ss"
  )} (UK time). The current block height on dee cred is ${
    info.blocks
  } with a hash ending in ${lastBitOfHash}... I've gone off piste again, this time we're using the dee cred chain`;

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

  return `Whoop, whoop, whoop... ${winner}`;
};

const readContestants = () => {
  const contestantsStr = join(", ", contestants).replace(/,(?=[^,]*$)/, " and");
  return `I love all our patrons but you've got to show me the money to get in the draw! Our contestants this week are ${contestantsStr}.`;
};

const steps = {
  intro: () =>
    "undred meters turn left and your destination will be on the right.",
  intro2: () =>
    "Sorry chaps, just finishing up on my other job. All set for the draw today?",
  verify: verifyAuthenticityOfDraw,
  contestants: readContestants,
  compIntro: () => "Contestants, are you ready?",
  winnerIntro: () => `${times(() => "blake,", 3)}. 2 5 6. The winner is...`,
  winner: pickWinner
};

const run = async step => {
  const say = await steps[step]();
  console.log(say);
};

const step = process.argv[2];
run(step);
