let dish = {
    name: 'Ete',
    scores: [5, 4, 1, 4, 2, 4, 1, 3, 1, 2],

    addScore: function(score, scores = this.scores){
        scores.push(score);
        return scores;
    },
    calculateAverageScore: function(scores = this.scores) {
        let totalScore = 0;
        for (let i = 0; i < scores.length; i++) {
            totalScore += scores[i];
        }
        return totalScore / scores.length;
    }
};

console.log(dish.calculateAverageScore())
console.log(dish.addScore(6));
console.log(dish.calculateAverageScore())