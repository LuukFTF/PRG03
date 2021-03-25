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

test('Test click event on parent', () => {
    document.body.innerHTML = getHTML();
    import_task_file("task.js");
    dispatchEvent(new Event("load"));

    //Test first li click
    let firstLi = document.getElementsByTagName('li')[0];
    firstLi.click();
    if (!firstLi.classList.contains('yellow')) {
        fail('Bij het aanklikken van het eerste list-item krijgt hij geen class "yellow"');
    }

    let inputElement = document.getElementById("todo-input");

    let evt = new CustomEvent("submit");
    document.getElementById('new-todo-form').dispatchEvent(evt);

    if (typeof formSubmitHandler !== 'function') {
        fail('De function "formSubmitHandler(e)" moet je wel laten staan!');
    }

    let createdLiItem = document.getElementsByTagName('li')[3];
    if (typeof createdLiItem === 'undefined' || !(createdLiItem instanceof HTMLLIElement)) {
        fail('Er is na submit geen nieuw list-item aan de HTML toegevoegd');
    }
    if (createdLiItem.innerHTML !== inputElement.value) {
        fail('De inhoud van het nieuwe list-item staat niet gelijk aan "' + inputElement.value + '" maar is "' + createdLiItem.innerHTML + '"');
    }

    createdLiItem.click();
    if (!createdLiItem.classList.contains('yellow')) {
        fail('Bij het aanklikken van een nieuw aangemaakt list-item krijgt hij geen class "yellow". Kijk goed of je de event listener hebt verwijderd op het nieuwe list-item!');
    }

    let jestUl = document.getElementById('todo');
    jestUl.click();
    if (jestUl.classList.contains('yellow')) {
        fail('Bij het aanklikken van de UL krijgt deze de class "yellow". Dat mag niet, zorg dat je hier een IF check voor schrijft zodat alleen een LI die class kan krijgen');
    }

    if (typeof ul === 'undefined' || !(ul instanceof HTMLUListElement)) {
        fail('De UL is niet als globaal aangemaakt, of is nog niet gekoppeld aan het HTML element met ID "todo" in de init functie')
    }
});

function getHTML() {
    return `
<h1>Events - click</h1>
<div id="message"></div>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad asperiores autem deleniti facere illo illum impedit libero maxime minus modi officiis, possimus qui quia quidem, tenetur totam! Fuga, id.</p>
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