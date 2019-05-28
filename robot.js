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
    reject({ symbol: "WAX" }),

    sayNumberOfChoices,
    sampleSize(4),
    map("name"),
    join(", ")
  )(data);
  return coins;
};

const run = async () => {
  const intro = `
  What a pleasure it is to have a crypto twitter guest on the show.
  ${pause(450)}
  Especially when they bring Boob lay some tinto!
  ${pause(750)}
  Hold tight Mr Blom Ting. Cheers!
  ${pause(1000)}
  Now, some important information for those who throw wild threats in my direction.
  ${pause(300)}
  I'm looking at you. At Crypto underscore Philia, on twitter.
  ${pause(300)}
  Who do you think you are?!
  ${pause(300)}
  Calling me ${pause(100)} a cunt?
  ${pause(300)}
  If you come anywhere near me I'll batter ya
  ${pause(250)}
  And shank your naan.
  ${pause(550)}
  do you feel me Philia?
  ${pause(1000)}
  If you. Or that jumped up stereo prick. I T K, come looking for me in the big smoke these will be the last words you'll ever hear:
  ${pause(1500)}
  Hold my beer boobs while I batter this cunt.
  ${pause(2500)}
  Anyway. Batterings aside. On with the show,
  ${pause(50)}
  Here's my picks for next week's crypto weekly's weekly crypto:
  ${pause(1000)}
  `;
  console.log(intro);

  const coins = await pickCoins();
  console.log(coins);
  console.log(`
  ${pause(2000)}
  So, Jordy Prince's dream has come true, we're fucking off all these coins and going to talk about the mechanics of trading.
  ${pause(1000)}
  this will be one hundred percent not financial advice!
  `);
};

run();
