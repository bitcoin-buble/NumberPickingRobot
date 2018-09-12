const fs = require("fs");
const axios = require("axios");
const moment = require("moment");
const hash = require("hash.js");
const { flow, slice, join, reverse, get, times } = require("lodash/fp");
const contestants = [
  "CryptoAnubis",
  "Irishbeastman25",
  "Jeffrey Crawford",
  "Kapzilla",
  "Lavisse",
  "Marm",
  "Myphatarz",
  "Pepper Plant Pants",
  "Swampy Bits",
  "William Bitting",
  "Big Crypto Dave"
];
const sponsor = "vih tar lick boot her inn ";

const verifyAuthenticityOfDraw = async () => {
  const { data: info } = await axios.get(
    "https://api.blockcypher.com/v1/eth/main"
  );

  // const  = getInfoResponse.;
  // console.log(info);

  // const { data: getBlockIndex } = await axios.get(
  //   `https://api.blockcypher.com/v1/eth/main/blocks/${info.hash}`
  // );

  const lastBitOfHash = flow(
    reverse,
    slice(0, 6),
    reverse,
    join(", ")
  )(info.hash);

  const output = `The date and time sponsored by ${sponsor} is ${moment().format(
    "dddd, MMMM Do YYYY, h:mm:ss"
  )} (UK time). The current block height on eeth ear ee um is ${
    info.height
  } with a hash ending in ${lastBitOfHash}`;

  fs.writeFileSync("./hash.txt", info.hash);

  return output;
};

const pickWinner = () => {
  const blockHash = fs.readFileSync("./hash.txt", "utf8");
  // console.log(blockHash);s
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

  return `${winner}`;
};

const readContestants = () => {
  const contestantsStr = join(", ", contestants).replace(/,(?=[^,]*$)/, " and");
  return `Our contestants this week are ${contestantsStr}. What a line up!`;
};

const steps = {
  intro: () =>
    "what's up, it's the robot. Back once again. By popular demand. For the renegade master. Ha ha.",
  intro2: () =>
    "Time to give away a fucking tea shirt. Ken you. fucking. retard.",

  verify: verifyAuthenticityOfDraw,
  contestants: readContestants,
  compIntro: () => "Contestants, are you ready?",
  winnerIntro: () =>
    `${times(() => "dagger,", 3)}. hashimoto. The winner is...`,
  winner: pickWinner
};

const run = async step => {
  const say = await steps[step]();
  console.log(say);
};

const step = process.argv[2];
run(step);
