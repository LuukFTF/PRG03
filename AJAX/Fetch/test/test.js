const path = require("path");
const fs = require("fs");

/**
 * Imports task file in order to use functions declared in it
 * @param f file name or its relative path to task
 */
function import_task_file(f) {
    let loadedTask = fs.readFileSync(path.join(__dirname, "..", f)).toString();
    loadedTask = loadedTask.replace(/let /g, 'var ').replace(/const /g, 'var ');
    eval.apply(global, [loadedTask]);
}

test('Test Fetch API', async () => {
    document.body.innerHTML = getHTML();
    console.log = jest.fn();

    let data = JSON.parse(fs.readFileSync(path.join(__dirname, "", "pokemon.json")).toString());
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(data),
        })
    );

    import_task_file("task.js");
    dispatchEvent(new Event("load"));
    $button.click();

    if (typeof apiUrl !== 'string' || apiUrl === "") {
        fail('De variable "apiUrl moet wel een string zijn EN een waarde bevatten.');
    }

    if (typeof getPokemons !== 'function') {
        fail('De function "getPokemons()" moet je wel laten staan!');
    }

    if (typeof getPokemonsSuccessHandler !== 'function') {
        fail('De function "getPokemonsSuccessHandler(data)" moet je wel laten staan!');
    }

    if (typeof getPokemonsErrorHandler !== 'function') {
        fail('De function "getPokemonsErrorHandler(data)" moet je wel laten staan!');
    }

    try {
        await global.fetch('').then((response) => response.json()).then(getPokemonsSuccessHandler).then(() => {
            if (typeof console.log.mock.calls[0] === 'undefined' ||
                typeof console.log.mock.calls[0][0] === 'undefined') {
                throw new Error('Er is geen console.log geschreven in de getPokemonsSuccessHandler()');
            }

            if (typeof console.log.mock.calls[0][0].results !== 'object') {
                throw new Error('De console.log bevat niet de data die uit de API callback komt');
            }
        });
    } catch (e) {
        fail(e);
    }
});

function getHTML() {
    return `
<h1>Open je console</h1>
<button id="load-pokemon">Haal data uit de Pokémon API</button>
    `;
}