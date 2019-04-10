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

const pickCoins = async () => {
  const { data } = await axios.get("https://api.coinpaprika.com/v1/coins");

  const coins = flow(
    reject({ rank: 0 }),
    orderBy(["rank"], ["asc"]),
    reject({ is_active: false }),
    reject({ symbol: "FCT" }),
    reject({ symbol: "STRAT" }),
    reject({ symbol: "LTC" }),
    reject({ symbol: "XTZ" }),
    reject({ symbol: "ZIL" }),
    reject({ symbol: "DAI" }),
    reject({ symbol: "MKR" }),
    slice(0, 100),
    sayNumberOfChoices,
    sampleSize(4),
    map("name"),
    join(", ")
  )(data);
  return coins;
};

const run = async () => {
  const intro = `
    Hold on chaps, what the bloody hell do you think you're doing? ${pause(
      250
    )} You just covered two coins in one there! For fucks sake. ${pause(
    400
  )} P Money, exec producer in chief, tis good to have you back friend. ${pause(
    400
  )}
  Anyway.
  Here's my picks for next week's crypto weekly's weekly crypto: ${pause(1000)}
  `;
  console.log(intro);

  const coins = await pickCoins();
  console.log(coins);
};

run();
