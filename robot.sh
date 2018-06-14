PARTICIPANTS=2
WINNER=$((1 + RANDOM % PARTICIPANTS))

say We only have two contestants this week so I\'m going to flip a doge coin to see who wins
read -n 1
say Heads, Lavisse,
say Tails, Jeffrey Archer, bollocks, I meant Jeffrey Crawford
read -n 1

if [ "$WINNER" = "1" ]; then
    say HEADS
    say Lavisse, you\'ve made it to the finest club in all of crypto.
    say Better luck next time Jeff
else
    say TAILS
    say JEFFREY CRAWFORD
    say I\'m going to miss saying your name Jeffrey Crawford, but I\'ll see you in beak chord
fi
