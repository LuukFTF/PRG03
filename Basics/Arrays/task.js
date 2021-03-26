let dishScores = [2, 1, 4, 5, 6];
let dishScoreNames = ["Never wanna eat here again", "Gonna go now, thats how bad it is", "Give me more of that food", "You are the best cheff i've ever seen", "Up there, is god and this amazing cheff!"];
let totalScore = 0;

for (let i = 0; i < dishScores.length; i++) {
    console.log(dishScores[i]+" "+dishScoreNames[i]);
    totalScore += dishScores[i];
}

console.log("Total score: " + totalScore + "/" + dishScores.length*5);

// de check code klopt hier niet :(

