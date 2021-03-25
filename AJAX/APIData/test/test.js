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

    if (typeof apiUrl !== 'string') {
        fail('De variable "apiUrl moet wel een string zijn.');
    }

    if (typeof getPokemonsSuccessHandler !== 'function') {
        fail('De function "getPokemonsSuccessHandler(data)" moet je wel laten staan!');
    }

    if (typeof pokemonClickHandler !== 'function') {
        fail('De function "pokemonClickHandler(e)" is nodig om je click af te vangen!');
    }

    if (typeof getPokemonDetailSuccessHandler !== 'function') {
        fail('De function "getPokemonDetailSuccessHandler(data)" is nodig als success handler voor je tweede AJAX call!');
    }

    try {
        await global.fetch('').then((response) => response.json()).then(getPokemonsSuccessHandler).then(() => {
            let $jestUl = document.getElementById('pokemons');
            if (typeof $jestUl !== 'object' || !($jestUl instanceof HTMLUListElement) || $jestUl.id !== 'pokemons') {
                throw new Error('Het UL element met ID "pokemons" bestaat niet in de HTML.');
            }
        });
    } catch (e) {
        fail(e);
    }

    let detailData = JSON.parse(fs.readFileSync(path.join(__dirname, "", "pokemon-detail.json")).toString());
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(detailData),
        })
    );
    document.getElementsByTagName('li')[0].click();

    try {
        await global.fetch('').then((response) => response.json()).then(getPokemonDetailSuccessHandler).then(() => {
            if ($types.innerHTML !== "grass, poison") {
                throw new Error('Het element met ID "types" wordt niet gevuld met de types uit de API na een click op een Pokémon');
            }
        });
    } catch (e) {
        fail(e);
    }
});

function getHTML() {
    return `
<h1>151 Pokémons</h1>
<button id="load-pokemon">Haal data uit de Pokémon API</button>
<div id="types"></div>
    `;
}