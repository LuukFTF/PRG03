window.addEventListener('load', init);

//Global vars
let apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';
let load = false;
let $button;
let $types;

function init() {
    $button = document.getElementById('load-pokemon');
    $button.addEventListener('click', () => request(apiUrl, getPokemonsSuccessHandler));
    $types = document.getElementById('types');
}

/**
 * Do the actual AJAX call to the provided URL
 */
function request(apiUrl, successCallback) {
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(successCallback)
        .catch(requestErrorHandler);
}

/**
 * Do something nice with the data you got from the external API
 *
 * @param data
 */
function getPokemonsSuccessHandler(data) {
    let $ul = document.createElement('ul');
    $ul.addEventListener('click', pokemonClickHandler);
    $ul.id = 'pokemons';

    for (let pokemon of data.results) {
        let $li = document.createElement('li');
        $li.innerHTML = pokemon.name;
        $li.dataset.url = pokemon.url;
        $ul.appendChild($li);
    }

    document.querySelector('body').appendChild($ul);

    load = true;
}

function pokemonClickHandler(e) {
    let $target = e.target;
    if ($target.nodeName !== "LI") {
        return;
    }

    let url = $target.dataset.url;

    request(url, getPokemonDetailSuccessHandler)
}

function getPokemonDetailSuccessHandler(data) {
    let types = [];
    for (let typeData of data.types) {
        types.push(typeData.type.name);
    }
    $types.innerHTML = types.join(', ');
}


/**
 * Do something useful with the error you got back from the external API
 *
 * @param data
 */
function requestErrorHandler(data) {
    console.error(data);
}


// tis pokemon en niet pokemons :(

