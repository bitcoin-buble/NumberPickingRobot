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
  So. Boobs didn't bother to do any research into Tezos. Looks like you winged it ok anyway. ${pause(
    500
  )}Shit, probably shouldn't have said that. ${pause(1000)} sorry dude.${pause(
    1000
  )} The community missed a huge opportunity to pick Augur this week but fingers crossed for next week. ${pause(
    1000
  )}
  Anyway.
  Here's my picks for next week's crypto weekly's weekly crypto: ${pause(1000)}
  `;
  console.log(intro);

  const coins = await pickCoins();
  console.log(coins);
};

run();
