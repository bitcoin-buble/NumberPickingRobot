const fs = require("fs");
const axios = require("axios");
const moment = require("moment");
const hash = require("hash.js");
const { flow, slice, join, reverse, get, times } = require("lodash/fp");
const contestants = ["Big Crypto Dave", "Irish beast man 25"];
const sponsor = "vee no Tinto";

const verifyAuthenticityOfDraw = async () => {
  const { data: blockHeight } = await axios.get(
    "https://dogechain.info/chain/Dogecoin/q/getblockcount"
  );

  // const info = getInfoResponse.info;
  const info = {
    blocks: blockHeight
  };

  const { data: getBlockIndex } = await axios.get(
    `https://dogechain.info/api/v1/block/${info.blocks}`
  );

  // console.log(getBlockIndex);
  const lastBitOfHash = flow(
    get("block.hash"),
    reverse,
    slice(0, 6),
    reverse,
    join(", ")
  )(getBlockIndex);

  const output = `The date and time sponsored by ${sponsor} is ${moment().format(
    "dddd, MMMM Do YYYY, h:mm:ss"
  )} (UK time). The current block height on Doge Coin is ${
    info.blocks
  } with a hash ending in ${lastBitOfHash}... I love dogs`;

  fs.writeFileSync("./hash.txt", getBlockIndex.block.hash);

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

  return `doggy, doggy, doggy style ... ${winner}`;
};

const readContestants = () => {
  const contestantsStr = join(", ", contestants).replace(/,(?=[^,]*$)/, " and");
  return `Howdy partner. I love dogs too. I also love all our patrons but it's only the proper ballers who get in the draw! Our contestants this week are ${contestantsStr}. Yee haw`;
};

const steps = {
  intro: () =>
    "I've got a lot of people that care about me. Never really knew it until now. I don't need that much help. I've played some video games before. I think I'm gonna try do a barrel roll, and if that goes good, I'm just gonna nose down and call it a night.",
  intro2: () =>
    "R I P The Robot Sky King! It looks like you're stuck with me from now on. Hold tight to our sponsor this week Ether roll How has everybody's week's been?",
  fuckIt: () =>
    "I'm going to do a coin flip today even though there's only one contestant. Sorry Big Dave, I couldn't make it too easy for ya",
  fuckIt2: () => "ha ha ha. Only joking! You're in!",
  verify: verifyAuthenticityOfDraw,
  contestants: readContestants,
  compIntro: () =>
    "Well done Doc, you're doing well so far. But who the fuck were they?",
  winnerIntro: () => `${times(() => "ess crypt,", 3)}. The winner is...`,
  winner: pickWinner
};

const run = async step => {
  const say = await steps[step]();
  console.log(say);
};

const step = process.argv[2];
run(step);
