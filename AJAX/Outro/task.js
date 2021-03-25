window.addEventListener('load', init);

//Global vars
let apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';
let loadPokemon = false;
let $button;
let $types;

function init() {
    $button = document.getElementById('load-pokemon');
    $button.addEventListener('click', () => ajaxRequest(apiUrl, getPokemonsSuccessHandler));
    $types = document.getElementById('types');
}

/**
 * Do the actual AJAX call to the provided URL
 */
function ajaxRequest(url, successCallback) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(successCallback)
        .catch(ajaxRequestErrorHandler);
}

/**
 * Do something nice with the data you got from the external API
 *
 * @param data
 */
function getPokemonsSuccessHandler(data) {
    //Prevent this function from being executed more than once
    if (loadPokemon === true) {
        return;
    }

    //Create a new ul element & add event listener on this parent
    let $ul = document.createElement('ul');
    $ul.addEventListener('click', pokemonClickHandler);
    $ul.id = 'pokemons';

    //Loop through data and create a li element per pokemon
    for (let pokemon of data.results) {
        let $li = document.createElement('li');
        $li.innerHTML = pokemon.name;
        $li.dataset.url = pokemon.url; //Store URL in element
        $ul.appendChild($li);
    }

    //Append new list to the DOM
    document.querySelector('body').appendChild($ul);

    //Prevent to load double data by switching the state
    loadPokemon = true;
}

/**
 * After clicking on a Pokémon it's time to load the extra API information
 *
 * @param e
 */
function pokemonClickHandler(e) {
    //First make sure we actually clicked on a li element
    let $target = e.target;
    if ($target.nodeName !== "LI") {
        return;
    }

    //Get the URL
    let url = $target.dataset.url;

    //Load the new data
    ajaxRequest(url, getPokemonDetailSuccessHandler)
}

/**
 * Write the types of the Pokémon in the existing HTML element
 *
 * @param data
 */
function getPokemonDetailSuccessHandler(data) {
    let types = [];
    for (let typeData of data.types) {
        types.push(typeData.type.name);
    }
    $types.innerHTML = types.join(', ');
}

/**
 * Do something useful with the error you got back from the external API
 * We will use this error function for both API calls for now
 *
 * @param data
 */
function ajaxRequestErrorHandler(data) {
    console.error(data);
}
