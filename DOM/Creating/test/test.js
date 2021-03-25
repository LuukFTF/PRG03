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

test('Test DOM creating', () => {
    document.body.innerHTML = getHTML();
    import_task_file("task.js");
    document.getElementById('button').click();

    if (typeof addItem !== 'function') {
        fail('De function "addItem" if niet aangemaakt');
    }

    let createdLiItem = document.getElementsByTagName('li')[3];
    if (typeof createdLiItem === 'undefined' || !(createdLiItem instanceof HTMLLIElement)) {
        fail('Er is geen nieuw list-item aan de HTML toegevoegd');
    }
    if (createdLiItem.innerHTML !== 'Watch the new X-Files') {
        fail('De inhoud van het nieuwe list-tem staat niet gelijk aan "Watch the new X-Files" maar is "' + createdLiItem.innerHTML + '"');
    }
});

function getHTML() {
    return `
<h1>Creating dom elements</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam architecto aspernatur beatae commodi dicta dolor ea est et exercitationem explicabo, iure quibusdam, repellat repellendus suscipit totam vel velit voluptas voluptatibus?</p>
<ul id="todo">
    <li>Finish creating a todo list</li>
    <li>Feed the cat</li>
    <li>Watch Adventure Time</li>
</ul>
<button id="button">Add item</button>
    `;
}