#!/bin/bash

node robot.js intro | tee >(say) | tee >(say -o intro.aifff)
read -n 1
node robot.js pickCoins | tee >(say) | tee >(say -o pickCoins.aiff )
read -n 1