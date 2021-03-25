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

test('Test form event', () => {
    document.body.innerHTML = getHTML();
    import_task_file("task.js");
    dispatchEvent(new Event("load"));

    let inputElement = document.getElementById("todo-input");

    let evt = new CustomEvent("submit");
    document.getElementById('new-todo-form').dispatchEvent(evt);

    if (typeof addItem !== 'function') {
        fail('De function "addItem(e)" moet je wel laten staan!');
    }

    let createdLiItem = document.getElementsByTagName('li')[3];
    if (typeof createdLiItem === 'undefined' || !(createdLiItem instanceof HTMLLIElement)) {
        fail('Er is na submit geen nieuw list-item aan de HTML toegevoegd');
    }
    if (createdLiItem.innerHTML !== inputElement.value) {
        fail('De inhoud van het nieuwe list-item staat niet gelijk aan "' + inputElement.value + '" maar is "' + createdLiItem.innerHTML + '"');
    }
});

function getHTML() {
    return `
<h1>Events - form</h1>
<div id="message"></div>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores corporis delectus ex hic in minus recusandae repellendus. A officia pariatur quisquam soluta. At, dolorem eum iste modi tempore tenetur voluptates.</p>
<ul id="todo">
    <li>Finish creating a todo list</li>
    <li>Feed the cat</li>
    <li>Watch Adventure Time</li>
</ul>
<form id="new-todo-form" method="post">
    <label for="todo-input">Text</label>
    <input type="text" value="" id="todo-input"/>
    <input type="submit" value="Add item"/>
</form>
    `;
}