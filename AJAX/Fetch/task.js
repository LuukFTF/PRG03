window.addEventListener('load', init);

//Global vars
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
let $button;

function init() {
    $button = document.getElementById('load-pokemon');
    $button.addEventListener('click', getPokemons);
}

/**
 * Do the actual AJAX call to the provided URL
 */
function getPokemons() {
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(getPokemonsSuccessHandler)
        .catch(getPokemonsErrorHandler);
}

/**
 * Do something nice with the data you got from the external API
 *
 * @param data
 */
function getPokemonsSuccessHandler(data) {
    console.log(data)
}

/**
 * Do something useful with the error you got back from the external API
 *
 * @param data
 */
function getPokemonsErrorHandler(data) {
    console.log(data)
}
