const axios = require("axios");
const { flow, slice, join, reverse, sample } = require("lodash/fp");
const contestants = ["Swampy Bits", "Myphatarz", "Lavisse", "CryptoAnubis"];

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
    join(" ")
  )(getBlockIndex.blockHash);

  const output = `The current block height on bitcoin is ${
    info.blocks
  } with a hash ending in ${lastBitOfHash}`;

  return output;
};

const pickWinner = flow(sample);

const run = async () => {
  const blockDetails = await verifyAuthenticityOfDraw();
  const winner = pickWinner(contestants);
  console.log(
    `${blockDetails} Picking a winner from ${join(
      ", ",
      contestants
    )}. And the winner is...`
  );
  console.log(winner);
};

run();
