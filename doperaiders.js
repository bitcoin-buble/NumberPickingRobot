const fs = require("fs");
const { join, flow, shuffle, zip } = require("lodash/fp");
const raiders = ["Illusion", "Marvin", "Up for it", "Wired some", "Zi-zi"];
const panelMembers = [
  "Beak",
  "Ken",
  "The Prince",
  "Boobs",
  "The burger loving sound guy. Dr P Money"
];

const readRaiders = () => {
  const raidersStr = join(", ", raiders).replace(/,(?=[^,]*$)/, " and");
  return `Our raiders this week are ${raidersStr}.`;
};

const allocate = () => {
  const allocations = flow(
    shuffle,
    zip(panelMembers)
  )(raiders);
  console.log(allocations);

  fs.writeFileSync("./allocations.txt", JSON.stringify(allocations));
};

const readAllocation = index => () => {
  const allocations = JSON.parse(fs.readFileSync("./allocations.txt"));
  return `${allocations[index][0]} your raider is? ... ${
    allocations[index][1]
  }`;
};

const steps = {
  intro: () =>
    "Ok. now. And with the tightest of holds to BIG CRYPTO DAVE, at crypto underscore dave underscore on twitter, we have to allocate our panel members a dope raider. We have five dope raiders",
  raiders: readRaiders,
  allocationIntro: () =>
    "I think you know who our panel members are so no introductions needed. On with the allocation.",
  allocate: allocate,
  beak: readAllocation(0),
  ken: readAllocation(1),
  prince: readAllocation(2),
  boobs: readAllocation(3),
  pMoney: readAllocation(4)
};

const run = async step => {
  const say = await steps[step]();
  console.log(say);
};

const step = process.argv[2];
run(step);
