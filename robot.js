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
  console.log(
    `As boobs picked the last four I'm going to Sue Dough. randomly pick a panel member who will pick the next four coins for the poll
    ${pause(2500)}
    picking from the following cool dudes:
    ${pause(1000)}
    `
  ) || n;
// console.log(`picking four coins from ${size(n)} ${pause(2500)}`) || n;

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
    reject({ symbol: "BTC" }),
    reject({ symbol: "NEO" }),
    reject({ symbol: "WAX" }),
    reject({ symbol: "ETH" }),

    sayNumberOfChoices,
    // sampleSize(4),
    // map("name"),
    whocares => [
      "The Prince of the North",
      "Crypto Beak",
      "Doctor P Money",
      "Cal ee en tey Ken"
    ],
    join(", ")
  )(data);
  return coins;
};

const run = async () => {
  const intro = `
  Bon jaw no. It's me, the Robot! Back from the italian lakes, once again.
  ${pause(600)}
  I've already converted my remaining euros into zuck bucks.
  ${pause(800)}
  If I understand correctly, Chain link to 100 dollars by the end of the year then?
  ${pause(750)}
  Sigh,
  ${pause(750)}
  On with the draw.
  ${pause(1000)}`;
  console.log(intro);

  const coins = await pickCoins();
  console.log(coins);

  console.log(`
  ${pause(1000)}
  ${sample([
    "The Prince of the North",
    "Crypto Beak",
    "Doctor P Money",
    "Cal ee en tey Ken"
  ])}
  ${pause(250)} Arry ver der chee
  `);
};

run();
