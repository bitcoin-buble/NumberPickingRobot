#!/bin/bash

node robot.js intro | tee >(say)
read -n 1
node robot.js pickCoins | tee >(say)
read -n 1