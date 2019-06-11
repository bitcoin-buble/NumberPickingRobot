#!/bin/bash

node robot-backup.js | tee >(say) | tee >(say -o robotSays-backup.aiff)