const fs = require("fs");
const axios = require("axios");
const moment = require("moment");
const hash = require("hash.js");
const { flow, slice, join, reverse, get, times } = require("lodash/fp");
const contestants = ["Swampy Bits", "Pepper Plant Pants", "Big Crypto Dave"];
const sponsor = "Bitcoin Cash";

const verifyAuthenticityOfDraw = async () => {
  const { data: getInfoResponse } = await axios.get(
    "https://bitcoincash.blockexplorer.com/api/status?getinfo"
  );

  const info = getInfoResponse.info;

  const { data: getBlockIndex } = await axios.get(
    `https://bitcoincash.blockexplorer.com/api/block-index/${info.blocks}`
  );

  const lastBitOfHash = flow(
    reverse,
    slice(0, 6),
    reverse,
    join(", ")
  )(getBlockIndex.blockHash);

  const output = `The date and time sponsored by ${sponsor} is ${moment().format(
    "dddd, MMMM Do YYYY, h:mm:ss a"
  )} (UK time). The current block height on bitcoin cash is ${
    info.blocks
  } with a hash ending in ${lastBitOfHash}. Yep, we've gone off piste and we're using the bitcoin cash chain this week`;

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

  return `You knows it... ${winner}`;
};

const readContestants = () => {
  const contestantsStr = join(", ", contestants).replace(/,(?=[^,]*$)/, " and");
  return `I love all our patrons but you've got to show me the money to get in the draw! Our contestants this week are ${contestantsStr}.`;
};

const steps = {
  intro: () =>
    "Hold tight listeners and hold tight lads! I've been a bit down this week. I really thought it was coming home. How's your week been Ken?",
  intro2: () =>
    "shush, I'm not really that bothered. Anyway, on with the draw...",
  verify: verifyAuthenticityOfDraw,
  contestants: readContestants,
  compIntro: () => "Contestants, are you ready?",
  winnerIntro: () =>
    `${times(
      () => "sha,",
      11
    )}. 2 5 6. Damn, I got a bit stuck there, I'm not using bitcoin cash again. The winner is...`,
  winner: pickWinner
};

const run = async step => {
  const say = await steps[step]();
  console.log(say);
};

const step = process.argv[2];
run(step);
