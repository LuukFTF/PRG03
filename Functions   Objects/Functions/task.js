let dishScores = [5, 4, 1, 3, 3, 4, 2, 4, 1];


function addScore(score1, score2){
    return score1 + score2;
}


function calculateAverageScore(scores) {
    let totalScore = 0;
    for (let i = 0; i < scores.length; i++) {
        totalScore += scores[i];
    }
    return totalScore / scores.length
}

console.log(addScore(dishScores[2], dishScores[3]))
console.log(calculateAverageScore(dishScores))