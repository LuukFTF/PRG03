/**
 * Imports task file in order to use functions declared in it
 * @param f file name or its relative path to task
 */
function import_task_file(f) {
    const path = require("path");
    const fs = require("fs");
    let loadedTask = fs.readFileSync(path.join(__dirname, "..", f)).toString();
    loadedTask = loadedTask.replace(/let /g, 'var ').replace(/const /g, 'var ');
    eval.apply(global, [loadedTask]);
}

test('Test the behaviour of the object', () => {
    import_task_file("task.js");

    if (typeof dish.name === 'undefined') {
        fail('De property "name" bestaat niet in het object "dish"');
    }

    if (typeof dish.scores === 'undefined' || !Array.isArray(dish.scores)) {
        fail('De property "scores" bestaat niet OF is geen valide array in het object "dish"');
    }

    if (typeof dish.addScore !== 'function') {
        fail('De method "addScore" is niet (op de juiste manier) toegevoegd aan het object "dish"');
    }
    dish.addScore(2);
    if (dish.scores[dish.scores.length - 1] !== 2) {
        fail('Wanneer ik dish.addScore(2) aanroep komt het getal 2 niet in de dish.scores array terecht');
    }

    if (typeof dish.calculateAverageScore !== 'function') {
        fail('De method "calculateAverageScore" is niet (op de juiste manier) toegevoegd aan het object "dish"');
    }
    let avgResult = dish.calculateAverageScore();
    if (avgResult !== testCalculateAverageScore(dish.scores)) {
        fail('Wanneer ik dish.calculateAverageScore() aanroep krijg ik geen 3 terug maar ' + avgResult);
    }
});

function testCalculateAverageScore(scores) {
    let total = 0;

    for (let value of scores) {
        total += value;
    }

    return total / scores.length;
}