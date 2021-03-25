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

test('Check capitalizeDish variable', () => {
    import_task_file("task.js");
    if (capitalizeDish !== 'Spaghetti') {
        fail('capitalizeDish zou gelijk moeten staan aan "Spaghetti" en niet aan "' + capitalizeDish + '"');
    }
});