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

test('Check if 2 variables exists', () => {
    import_task_file("task.js");

    if (typeof dish !== 'string') {
        fail('Variabele dish is niet aangemaakt of het is geen string');
    }

    if (typeof dishScore !== 'number') {
        fail('Variabele dishScore is niet aangemaakt of het is geen number');
    }
});