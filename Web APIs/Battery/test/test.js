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

test('Test battery API', () => {
    document.body.innerHTML = getHTML();

    let batteryManager = {
        charging: false,
        chargingTime: Infinity,
        dischargingTime: 9660,
        level: 0.95,
        addEventListener: jest.fn()
    };

    global.navigator.getBattery = jest.fn().mockImplementation(() => new Promise((callback) => callback(batteryManager)));

    import_task_file("task.js");
    dispatchEvent(new Event("load"));

    if (typeof $targetStatus !== 'object' || !($targetStatus instanceof HTMLDivElement) || $targetStatus.id !== 'target-status') {
        fail('De variable $targetStatus is niet gekoppeld aan het HTML DIV element met ID "target-status"');
    }

    if (typeof $targetRemaining !== 'object' || !($targetRemaining instanceof HTMLDivElement) || $targetRemaining.id !== 'target-remaining') {
        fail('De variable $targetRemaining is niet gekoppeld aan het HTML DIV element met ID "target-remaining"');
    }

    if (typeof getBatteryStatus !== 'function') {
        fail('De function "getBatteryStatus()" moet je wel laten staan!');
    }

    if (typeof showBatteryStatus !== 'function') {
        fail('De function "showBatteryStatus(battery)" moet je wel laten staan!');
    }

    navigator.getBattery().then(() => {
        if ($targetStatus.innerHTML !== "95%") {
            fail('Het percentage in het HTML element met ID "target-status" wordt niet (juist) geplaatst, er staat nu: ' + $targetStatus.innerHTML);
        }

        if ($targetRemaining.innerHTML.startsWith("Je apparaat zal uitgaan over") === false) {
            fail('Wanneer "batteryManager.dischargingTime" een getal bevat, moet het HTML element met ID "target-remaining" starten met de tekst "Je apparaat zal uitgaan over", maar het is nu: ' + $targetRemaining.innerHTML);
        }

        batteryManager.dischargingTime = Infinity;
        showBatteryStatus(batteryManager);
        if ($targetRemaining.innerHTML !== "Je apparaat zal niet uitgaan zolang je aan de stroom zit aangesloten!") {
            fail('Wanneer "batteryManager.dischargingTime" gelijk staat aan "Infinity", moet het HTML element met ID "target-remaining" de tekst "Je apparaat zal niet uitgaan zolang je aan de stroom zit aangesloten!" bevatten maar is nu: ' + $targetRemaining.innerHTML);
        }
    });
});

function getHTML() {
    return `
<div id="target-status"></div>
<div id="target-remaining"></div>
    `;
}