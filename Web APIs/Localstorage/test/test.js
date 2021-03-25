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

test('Test localstorage API', () => {
    document.body.innerHTML = getHTML();

    const localStorageMock = (function () {
        let store = {};
        return {
            getItem: function (key) {
                return typeof store[key] !== "undefined" ? store[key] : null;
            },
            setItem: function (key, value) {
                store[key] = value.toString();
            },
            clear: function () {
                store = {};
            },
            removeItem: function (key) {
                delete store[key];
            }
        };
    })();
    Object.defineProperty(global, 'localStorage', {value: localStorageMock});

    import_task_file("task.js");
    dispatchEvent(new Event("load"));

    if (typeof $form !== 'object' || typeof $nameField !== 'object' || typeof $ageField !== 'object' || typeof $deleteButton !== 'object') {
        fail('Ga niet aan de code uit de init zitten, we hebben de variabelen allemaal nodig.');
    }

    if (typeof fillFieldsFromLocalStorage !== 'function') {
        fail('De function "fillFieldsFromLocalStorage()" moet je wel laten staan!');
    }

    if (typeof formSubmitHandler !== 'function') {
        fail('De function "formSubmitHandler(e)" moet je wel laten staan!');
    }

    if (typeof deleteClickHandler !== 'function') {
        fail('De function "deleteClickHandler(e)" moet je wel laten staan!');
    }

    $nameField.value = 'Antwan';
    $ageField.value = '34';
    let evt = new CustomEvent("submit");
    document.getElementById('form').dispatchEvent(evt);

    if (localStorage.getItem('name') === null) {
        fail('De key "name" is niet opgeslagen met localStorage');
    }

    if (localStorage.getItem('name') !== $nameField.value) {
        fail('De key "name" in localStorage staat niet gelijk aan de waarde uit het input field');
    }

    if (localStorage.getItem('age') === null) {
        fail('De key "age" is niet opgeslagen met localStorage');
    }

    if (localStorage.getItem('age') !== $ageField.value) {
        fail('De key "age" in localStorage staat niet gelijk aan de waarde uit het input field');
    }

    $nameField.value = '';
    $ageField.value = '';
    fillFieldsFromLocalStorage();
    if ($nameField.value !== 'Antwan') {
        fail('De functie "fillFieldsFromLocalStorage()" schrijft de key "name" uit localStorage niet terug in het input field');
    }
    if ($ageField.value !== '34') {
        fail('De functie "fillFieldsFromLocalStorage()" schrijft de key "age" uit localStorage niet terug in het input field');
    }

    $deleteButton.click();
    if (localStorage.getItem('name') !== null) {
        fail('De functie "deleteClickHandler" verwijderd de key "name" niet uit localStorage');
    }
    if (localStorage.getItem('age') !== null) {
        fail('De functie "deleteClickHandler" verwijderd de key "age" niet uit localStorage');
    }
});

function getHTML() {
    return `
<form id="form">
    <div class="form-item">
        <label for="name">Name</label>
        <input type="text" id="name" name="name"/>
    </div>
    <div class="form-item">
        <label for="age">Age</label>
        <input type="number" id="age" name="age"/>
    </div>
    <div class="form-item">
        <input type="submit" name="submit" value="Save in local storage"/>
    </div>
</form>
<button type="button" id="delete">Delete items in local storage</button>
    `;
}