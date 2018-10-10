const fs = require("fs");
const axios = require("axios");
const moment = require("moment");
const hash = require("hash.js");
const { flow, slice, join, reverse, get, times } = require("lodash/fp");
const contestants = [
  "CryptoAnubis",
  "Irishbeastman25",
  "Jeffrey Crawford",
  // "Kap kap kap Kap zilla",
  "Lavisse",
  "Maarm",
  "Myphatarz",
  "Pepper Plant Pants",
  "Swampy Bits",
  "William Bitting",
  "Big Crypto Dave"
];

const sponsor = "Beers for Brett";

const verifyAuthenticityOfDraw = async () => {
  const { data: info } = await axios.get(
    "https://api.blockcypher.com/v1/eth/main"
  );

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
  } with a hash ending in ${lastBitOfHash}.`;

  fs.writeFileSync("./hash.txt", info.hash);

  return output;
};

const pickWinner = () => {
  const blockHash = fs.readFileSync("./hash.txt", "utf8");

  let winner;
  let nonce = 0;

  while (!winner) {
    const strToHash = `${blockHash}-${nonce}`;

    const hashOfHash = hash
      .sha256()
      .update(strToHash)
      .digest("hex");

    const char = slice(0, 1, hashOfHash);

    winner = get(char, contestants);
    nonce++;
  }

  return `HOLD TIGHT. This week's winner is... ${winner}`;
};

const readContestants = () => {
  const contestantsStr = join(", ", contestants).replace(/,(?=[^,]*$)/, " and");
  return `Our contestants this week are ${contestantsStr}.`;
};

const steps = {
  intro: () =>
    "Well lads, you will be pleased to know that I'm no longer a stuttering pot head. I'm cure cure cure cure cured.",
  laugh: () => "ha hah hah. Mwah hah ha hah",
  intro2: () => "I had you going there didn't I",
  intro3: () =>
    "On a serious note, you lot have had some proper high IQ chat this week. It's a shame P Money has to cut half of it!",
  verify: verifyAuthenticityOfDraw,
  contestants: readContestants,
  compIntro: () => "Cun testants, are you ready?",
  winnerIntro: () => `${times(() => "dah. dah. dah. dagger,", 3)}. hashimoto.`,
  winner: pickWinner
};

const run = async step => {
  const say = await steps[step]();
  console.log(say);
};

const step = process.argv[2];
run(step);
