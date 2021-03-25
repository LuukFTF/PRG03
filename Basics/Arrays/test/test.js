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

test('Check if for loop worked out', () => {
    console.log = jest.fn();
    import_task_file("task.js");

    let calculatedScore = dishScores.reduce((a, b) => a + b, 0);
    if (totalScore !== calculatedScore) {
        fail('totalScore zou gelijk moeten staan aan: ' + calculatedScore);
    }

    if (typeof console.log.mock.calls[0] === 'undefined' ||
        typeof console.log.mock.calls[0][0] === 'undefined' ||
        typeof console.log.mock.calls[5][0] === 'undefined') {
        fail('Er is geen console.log geschreven in de loop');
    }

    console.log.mock.calls.forEach((value, index) => {
        let formattedString = dishScores[index] + ' ' + dishScoreNames[dishScores[index] - 1];
        if (value[0] !== formattedString) {
            fail('De waarde ' + value[0] + ' staat niet gelijk aan ' + formattedString);
        }
    });
});