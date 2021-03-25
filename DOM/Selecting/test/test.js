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

test('Test DOM selection', () => {
    document.body.innerHTML = getHTML();
    import_task_file("task.js");

    if (typeof totalPlaceholder === 'undefined') {
        fail('De variable "totalPlaceholder" if niet aangemaakt');
    }

    if (!(totalPlaceholder instanceof HTMLDivElement)) {
        fail('De variable "totalPlaceholder" is niet goed gekoppeld aan het juiste opgehaald HTML element uit de opdracht');
    }

    let jestTotalCalculated = total.toFixed(2);
    let jestTotalInHTML = totalPlaceholder.innerHTML;
    if (jestTotalInHTML !== jestTotalCalculated) {
        fail('De waarde van "totalPlaceholder" (' + jestTotalInHTML + ') is niet gelijk aan de verwachte ' + jestTotalCalculated);
    }
});

function getHTML() {
    return `
<h1>Selecting dom elements</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid architecto delectus deleniti dolores earum eius enim in ipsam magnam maiores maxime nam nesciunt, nisi, nostrum odit pariatur quae quidem tempore?</p>

<div id="container">
    <h1>Mijn bonnetjes</h1>

    <div id="total"></div>

    <ul id="receipt">
        <li>2.45</li>
        <li>6.45</li>
        <li>6.56</li>
        <li>7.49</li>
    </ul>
</div>
    `;
}