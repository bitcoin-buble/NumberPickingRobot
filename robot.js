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
    reject({ symbol: "BTC" }),
    reject({ symbol: "NEO" }),

    sayNumberOfChoices,
    sampleSize(4),
    map("name"),
    join(", ")
  )(data);
  return coins;
};

const run = async () => {
  const intro = `


  Wew laddy, thirty dollar b n b and counting. Good thing my bags are full to the brim. Hold tight C Z.
  ${pause(450)}
  Oh
  ${pause(350)}
  Neo got picked for this weeks deep dive,
  ${pause(100)}
   rough break lads.
   ${pause(100)}
   But if you will entrust such matters to the gremlins of crypto twitter, you deserve nothing less. How many times must the Prince
  tell you that democracy is an abject failure before you grow a pair and inject some centralised authority into this process.
  ${pause(50)}
Hold tight the Prince in the North.
${pause(150)}
  Anyhoo, on with the show,
${pause(50)}
  Here's my picks for next week's crypto weekly's weekly crypto:
  ${pause(1000)}
  `;
  console.log(intro);

  const coins = await pickCoins();
  console.log(coins);
};

run();
