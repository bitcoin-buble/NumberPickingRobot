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

    // x => console.log("y", size(x)) || x,
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
    // x => console.log(x, size(x)) || x,
    // x => console.log("x", size(x)) || x,

    sayNumberOfChoices,
    sampleSize(4),
    map("name"),
    join(", ")
  )(data);
  return coins;
};

const run = async () => {
  const intro = `
  What a dude Tal Kol is for spending an hour chatting tech with you two nerds. ${pause(
    400
  )} Legend ${pause(
    1000
  )} Still, probably would have been more fun to watch Beak talk positively about ee oss

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
