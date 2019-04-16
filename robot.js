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
    reject({ symbol: "KCS" }),
    reject({ symbol: "BCHSV" }),
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
    Just to be clear, Craig Wright is not Satoshi. ${pause(
      500
    )} He is a complete fucking moron though. ${pause(
    1000
  )} P Money, made it back for one week and now given up on us again. ${pause(
    500
  )} Tut. Tut. ${pause(500)}
  Anyway.
  Here's my picks for next week's crypto weekly's weekly crypto:
  ${pause(1000)} Just one more thing to do. ${pause(
    500
  )} Dee listing Bitcoin Cash Shit Version
  ${pause(1000)}
  `;
  console.log(intro);

  const coins = await pickCoins();
  console.log(coins);
};

run();
