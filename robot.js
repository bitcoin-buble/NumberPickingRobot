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
  // "Lavisse",
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

  // return output;
  return "This week's draw is sponsored by our HORSE div ease! The time is the time, the date the date. whatever.";
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

  return `Ken, do the honours and give ${winner} a t shirt will you.`;
};

const readContestants = () => {
  const contestantsStr = join(", ", contestants).replace(/,(?=[^,]*$)/, " and");
  // return `Our contestants this week are ${contestantsStr}.`;
  return "Fuck's sake. Our contestants this week are the same as last week. Come on you scum bags. Man's got to get paid";
};

const steps = {
  intro: () =>
    "It's late. Ken's coin went on too long. The wine's finished. Teather is fucked and. Roo beanie is a nob head so I can't be fucked with all the spiel today lads. Also, Boobs has got to go pack so he can get his surf on tomorrow.",
  intro2: () => "",
  intro3: () => "",
  verify: verifyAuthenticityOfDraw,
  contestants: readContestants,
  compIntro: () => "Cun testants, are you ready?",
  // winnerIntro: () => `${times(() => "dah. dah. dah. dagger,", 3)}. hashimoto.`,
  winnerIntro: () =>
    `You know the drill. Dah dah dah. dagger. And all that jazz.`,
  winner: pickWinner
};

const run = async step => {
  const say = await steps[step]();
  console.log(say);
};

const step = process.argv[2];
run(step);
