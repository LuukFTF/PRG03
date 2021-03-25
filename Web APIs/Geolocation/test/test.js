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

test('Test geolocation API', () => {
    document.body.innerHTML = getHTML();
    global.navigator.geolocation = {};
    import_task_file("task.js");
    dispatchEvent(new Event("load"));

    global.navigator.geolocation = {
        getCurrentPosition: jest.fn()
            .mockImplementationOnce((success) => Promise.resolve(success({
                coords: {
                    latitude: 51.1,
                    longitude: 45.3
                }
            }))),
        watchPosition: jest.fn()
    };

    if (typeof $target !== 'object' || !($target instanceof HTMLDivElement) || $target.id !== 'target') {
        fail('De variable $target is niet gekoppeld aan het HTML DIV element met ID "target"');
    }

    if (typeof $button !== 'object' || !($button instanceof HTMLButtonElement) || $button.id !== 'button') {
        fail('De variable $button is niet gekoppeld aan het HTML element met ID "button"');
    }

    if (typeof buttonClickHandler !== 'function') {
        fail('De function "buttonClickHandler(e)" moet je wel laten staan!');
    }

    if (typeof showCurrentLocation !== 'function') {
        fail('De function "showCurrentLocation(location)" moet je wel laten staan!');
    }

    $button.click();

    if ($target.innerHTML === "") {
        fail('De latitude en longitude worden niet in het HTML element met ID "target" geplaatst, het element is nu nog leeg');
    }

    if ($target.innerHTML !== "51.1, 45.3") {
        fail('De latitude en longitude worden niet in het HTML element met ID "target" geplaatst, er staat nu: ' + $target.innerHTML);
    }
});

function getHTML() {
    return `
<div id="target"></div>
<button id="button">Get Geo location</button>
    `;
}
