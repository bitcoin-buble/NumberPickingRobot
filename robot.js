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
    `Sue Dough. randomly picking four coins from roughly the top 100 ish ${pause(
      2500
    )}`
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
    sampleSize(4),
    map("name"),
    whocares => ["Genesis Vision", "Nexo", "Chain Link", "Loom"],
    join(", ")
  )(data);
  return coins;
};

const run = async () => {
  const intro = `
  Fuck me, you pair were pished last week! ${pause(
    300
  )} I lost track of who's who. Can you try and keep it together tonight please.
  ${pause(750)}
  No real news from me this week, except that my bags are packed full of Ethereum ready for my holiday with Boobs next week.
  ${pause(300)}
  On with the draw.
  ${pause(1000)}`;
  console.log(intro);

  const coins = await pickCoins();
  console.log(coins);

  console.log(`
  ${pause(450)} Randomness
  ${pause(200)} sorry, democracy,
  ${pause(200)} for the win
  ${pause(250)} You're welcome
  `);
};

run();
