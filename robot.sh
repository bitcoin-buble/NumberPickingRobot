PARTICIPANTS=2
WINNER=$((1 + RANDOM % PARTICIPANTS))

say Congratulations to Jeffrey Crawford, our winner last week. Proper Rockstar.
read -n 1
say We only have two contestants again this week so I\'m flipping another fucking doge coin
read -n 1
say can you lot pull your fingers out of your arses and donate a small amount on pay tree on so I\'ve got more people to pick from
read -n 1
say Lavisse, you get heads again,
say Tails, Greg Campbell
read -n 1

if [ "$WINNER" = "1" ]; then
    say HEADS
    say Lavisse, you\'ve made it to the finest club in all of crypto.
    read -n 1
    say Better luck next time big G
else
    say TAILS
    say Greg Campbell
    read -n 1
    say I thought I was going to win one day when I bought the peak in December. Lavisse, you might be luckier than me one day.
fi
