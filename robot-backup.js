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
    `Actually randomly picking four coins from roughly the top ${size(
      n
    )} ish ${pause(2500)}`
  ) || n;

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
    sampleSize(4),
    map("name"),
    join(", ")
  )(data);
  return coins;
};

const run = async () => {
  const intro = `
  FINE!
  ${pause(300)} I'm not doing it again next week though.
  ${pause(300)} Here we go ...
  ${pause(1000)}`;
  console.log(intro);

  const coins = await pickCoins();
  console.log(coins);

  console.log(`
  ${pause(450)} Sorry G P.
  ${pause(450)} I tried.
  `);
};

run();
