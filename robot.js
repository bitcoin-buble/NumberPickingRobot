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

const sayNumberOfChoices = n =>
  console.log(`picking four coins from ${size(n)} ${pause(2500)}`) || n;

const pickCoins = async () => {
  const { data } = await axios.get("https://api.coinpaprika.com/v1/coins");

  const coins = flow(
    reject({ rank: 0 }),
    reject({ is_active: false }),
    orderBy(["rank"], ["asc"]),
    slice(0, 100),

    reject({ symbol: "FCT" }),
    reject({ symbol: "STRAT" }),
    reject({ symbol: "LTC" }),
    reject({ symbol: "XTZ" }),
    reject({ symbol: "ZIL" }),
    reject({ symbol: "DAI" }),
    reject({ symbol: "MKR" }),
    reject({ symbol: "KCS" }),
    reject({ symbol: "BCHSV" }),
    reject({ symbol: "ICX" }),
    reject({ symbol: "ORBS" }),
    reject({ symbol: "DOGE" }),

    sayNumberOfChoices,
    sampleSize(4),
    map("name"),
    join(", ")
  )(data);
  return coins;
};

const run = async () => {
  const intro = `
  I love dogs. ${pause(400)} No ${pause(
    400
  )} I don't think you understand how much I love dogs. ${pause(
    600
  )} But ${pause(200)} Dogecoin is a complete waste of everyone's time. ${pause(
    1000
  )} Hold tight Just the Charts for keeping shit proper tight. ${pause(
    300
  )} The real ones know why.
  ${pause(1000)}
  Anyway.
  Here's my picks for next week's crypto weekly's weekly crypto:
  ${pause(1000)}
  `;
  console.log(intro);

  const coins = await pickCoins();
  console.log(coins);
};

run();
