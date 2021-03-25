let dishScores = [5, 4, 1, 3, 3, 4];
let dishScoreNames = ["Bleh", "Mwah", "Oke", "Lekker", "Mag ik nog een keer opscheppen?"];
let totalScore = 0;

for (let score of dishScores) {
    totalScore += score;
    console.log(score + ' ' + dishScoreNames[score - 1]);
}

console.log('Total score: ' + totalScore);
