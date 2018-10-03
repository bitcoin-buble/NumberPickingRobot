const fs = require("fs");
const axios = require("axios");
const moment = require("moment");
const hash = require("hash.js");
const { flow, slice, join, reverse, get, times } = require("lodash/fp");
const contestants = [
  "CryptoAnubis",
  "Irishbeastman25",
  "Jeffrey Crawford",
  "Kap kap kap Kap zilla",
  "Marm",
  "Myphatarz",
  // "Pepper Plant Pants",
  "Swampy Bits",
  "William Bitting",
  "Big Crypto Dave"
];

const sponsor = "P Muh Muh Muh Money's Health Insurance";

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
  )} (UK time). The current block height on eeth ear ree yum is ${
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

  return `The greatest to ever do it. ${winner}`;
};

const readContestants = () => {
  const contestantsStr = join(", ", contestants).replace(/,(?=[^,]*$)/, " and");
  return `Our contestants this week are ${contestantsStr}. What a line up!`;
};

const steps = {
  intro: () =>
    "Shh. Shh. Shh. Shh. Shit the bed, that was one hell of a. rye. rye. ride with Doctor P Muh Muh Muh Money last week! Soh. Soh. Soh. Sorry. boo. boo. boobs.",
  wew: () =>
    "Wew. I've not had my buh buh buh balls tickled like that before. It's tur. tur. turned me in to a stuh. stuh. stuh. stuh. stuttering poh. poh. pot head",
  intro2: () =>
    "I've been having some therapy so should be rye rye rye right as rain in no time. On with the draw",

  verify: verifyAuthenticityOfDraw,
  contestants: readContestants,
  compIntro: () =>
    "Cuh. cuh. cuh. cunt. cunt. cunt. contestants, are you ready?                  Oh for fuh. fuh. fuh. fucks sake.",
  winnerIntro: () =>
    `${times(() => "dah. dah. dah. dagger,", 3)}. hashimoto. The winner is...`,
  winner: pickWinner
};

const run = async step => {
  const say = await steps[step]();
  console.log(say);
};

const step = process.argv[2];
run(step);
