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
  console.log(`picking four coins from ${size(coins)} ${pause(1500)}`) || coins;

const pickCoins = async () => {
  const { data } = await axios.get("https://api.coinpaprika.com/v1/coins");

  const coins = flow(
    reject({ rank: 0 }),
    orderBy(["rank"], ["asc"]),
    slice(0, 100),
    reject({ is_active: false }),
    reject({ symbol: "FCT" }),
    reject({ symbol: "STRAT" }),
    sayNumberOfChoices,
    sampleSize(4),
    map("name"),
    join(", ")
  )(data);
  return coins;
};

const run = async step => {
  const intro = `Wew. ${pause(200)}
  The stratis fam are super into their twitter polls hey! ${pause(700)}
  I wonder which crypto ${pause(200)} army are going to come out this week.
  Here's my picks for next week's crypto weekly's weekly crypto: ${pause(2500)}
  Hold on ${pause(200)} I'm thinking ${pause(2500)}
  `;
  console.log(intro);

  const coins = await pickCoins();
  console.log(coins);
};

const step = process.argv[2];
run(step);
