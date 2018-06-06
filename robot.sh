PARTICIPANTS=$1


echo Sorry about the fuck up last week chaps | say && \
echo pause && \
read -n 1 && \
echo good luck to our contestants today, number one, crypto mate, number two, Jeffrey Crawford, and, number three, Lavisse. In the style of jor D P, that\'s, L, A, V, I, S, S, E | say && \
echo pause && \
read -n 1 && \
echo picking a number between 1 and ${PARTICIPANTS}... | say && \
echo pause && \
read -n 1 && \
echo $((1 + RANDOM % PARTICIPANTS)) | say && \
echo pause && \
read -n 1 && \
echo congratulations, see you at the next fire side chat | say

