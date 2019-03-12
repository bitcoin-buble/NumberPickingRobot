#!/bin/bash

node robot.js | tee >(say) | tee >(say -o robotSays.aiff)