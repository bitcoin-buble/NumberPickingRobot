const axios = require("axios");
const {
  sample,
  flow,
  orderBy,
  slice,
  sampleSize,
  reject,
  map,
  join
} = require("lodash/fp");

const pickCoins = async () => {
  const { data } = await axios.get("https://api.coinpaprika.com/v1/coins");

  const coins = flow(
    reject({ rank: 0 }),
    orderBy(["rank"], ["asc"]),
    reject({ name: "Factom" }),
    slice(0, 100),
    sampleSize(4),
    map("name"),
    join(", ")
  )(data);
  return coins;
};

const steps = {
  intro: () =>
    "Oh, fellas. I thought you'd be more into factom than that!. Here's four more coins for The. Big. Squizzers. twitter poll:",

  pickCoins: pickCoins
};

const run = async step => {
  const say = await steps[step]();
  console.log(say);
};

const step = process.argv[2];
run(step);
