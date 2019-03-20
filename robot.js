const axios = require("axios");
const {
  sample,
  flow,
  orderBy,
  slice,
  sampleSize,
  reject,
  map,
  join,
  size
} = require("lodash/fp");

const pause = ms => `[[slnc ${ms}]]`;

const sayNumberOfChoices = coins =>
  console.log(`picking four coins from ${size(coins)} ${pause(2500)}`) || coins;

const sayJoke = arr =>
  console.log(
    `picking four coins from one. ${pause(500)} Augur, ${pause(
      200
    )} Augur, ${pause(200)} Augur, ${pause(200)} and Augur, ${pause(
      2000
    )} Ha ha ha ha. Let's do it prop err lee now ${pause(200)}`
  ) || arr;

const pickCoins = async () => {
  const { data } = await axios.get("https://api.coinpaprika.com/v1/coins");

  const coins = flow(
    reject({ rank: 0 }),
    orderBy(["rank"], ["asc"]),
    slice(0, 100),
    reject({ is_active: false }),
    reject({ symbol: "FCT" }),
    reject({ symbol: "STRAT" }),
    reject({ symbol: "LTC" }),
    sayJoke,
    sayNumberOfChoices,
    sampleSize(4),
    map("name"),
    join(", ")
  )(data);
  return coins;
};

const run = async () => {
  const intro = `
  Lite coin hey, ${pause(
    200
  )} what a shit show. I've never been a fan of Charlie Lee. ${pause(
    500
  )}. Clearly the community can't be trusted to pick a coin for us to deep dive into!
  Anyway.
  Here's my picks for next week's crypto weekly's weekly crypto: ${pause(1000)}
  `;
  console.log(intro);

  const coins = await pickCoins();
  console.log(coins);
};

run();
