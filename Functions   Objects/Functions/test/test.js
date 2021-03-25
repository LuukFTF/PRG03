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

test('Test if the functions behave as expected', () => {
    import_task_file("task.js");

    let scoreResult = addScore(2, 3);
    if (typeof scoreResult === 'undefined') {
        fail('Je functie "addScore" moet een "return" statement hebben');
    }
    if (scoreResult !== 5) {
        fail('Wanneer ik addScore(2, 3) zou het resultaat 5 moeten zijn, maar het is ' + scoreResult);
    }

    let avgResult = calculateAverageScore(dishScores);
    if (typeof avgResult === 'undefined') {
        fail('Je functie "calculateAverageScore" moet een "return" statement hebben');
    }
    if (avgResult !== 3) {
        fail('Wanneer ik calculateAverageScore(dishScores) aanroep zou het resultaat 3 moeten zijn, maar het is ' + avgResult);
    }
    if (calculateAverageScore([0, 1, 2]) !== 1) {
        fail('Wanneer ik calculateAverageScore([0, 1, 2]) aanroep zou het resultaat 1 moeten zijn, maar het is ' + calculateAverageScore([0, 1, 2]));
    }
});