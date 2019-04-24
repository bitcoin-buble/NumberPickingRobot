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
    reject({ symbol: "ICX" }),
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
  A robot has no beginning or end ${pause(
    800
  )} it is always in the middle ${pause(800)} between things ${pause(1500)}
    I'm not sure where that intro came from last week.${pause(
      400
    )} It was nothing to do with me. ${pause(
    1000
  )} Even so, I agree with the anonymous person who put it together in that Craig is a complete fraud ${pause(
    1000
  )} allegedly.
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
