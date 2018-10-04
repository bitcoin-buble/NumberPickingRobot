#!/bin/bash

node robot.js intro | tee >(say) | say -o "./output/intro.aiff"
read -n 1
node robot.js wew | tee >(say) | say -o "./output/wew.aiff"
read -n 1
node robot.js intro2 | tee >(say) | say -o "./output/intro2.aiff"
read -n 1
node robot.js verify | tee >(say) | say -o "./output/verify.aiff"
read -n 1
node robot.js contestants | tee >(say) | say -o "./output/contestants.aiff"
read -n 1
node robot.js compIntro | tee >(say) | say -o "./output/compIntro.aiff"
read -n 1
node robot.js winnerIntro | tee >(say) | say -o "./output/winnerIntro.aiff"
read -n 1
node robot.js winner | tee >(say) | say -o "./output/winner.aiff"
