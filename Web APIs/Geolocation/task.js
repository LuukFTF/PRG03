window.addEventListener('load', init);

//Global vars
let $target;
let $button;

function init() {
    //Koppel de 2 global variabelen aan de HTML elementen

    //For older browsers a fallback
    if (typeof navigator.geolocation === "undefined") {
        $target.innerHTML = 'Geolocation API not supported.';
        return;
    }

    //Click event op button
}

/**
 * @param e
 */
function buttonClickHandler(e) {
    //Zorg ervoor dat de functie 'showCurrentLocation' wordt aangeroepen op basis van de geolocation API
}

/**
 * You could use this information to place a marker on a (Google) Maps plugin
 *
 * @param location
 */
function showCurrentLocation(location) {
    $button.remove();
    //Plaats de latitude en longitude in de $target HTML
}
