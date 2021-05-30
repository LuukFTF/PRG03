window.addEventListener('load', init);

//Global vars
let $targetStatus;
let $targetRemaining;

function init() {
    //Koppel HTML elementen aan de global vars
    $targetStatus = document.getElementById('target-status');
    $targetRemaining = document.getElementById('target-remaining');
    getBatteryStatus();
}

function getBatteryStatus() {
    if (typeof navigator.getBattery === "undefined") {
        $targetStatus.innerHTML = 'Battery API not supported.';
        return;
    }

    navigator.getBattery().then((battery) => {
        showBatteryStatus(battery);
        battery.addEventListener('levelchange', () => showBatteryStatus(battery));
    });
}

/**
 * Show the status to the user based on the actual battery status
 *
 * @param battery
 */
function showBatteryStatus(battery) {
    $targetStatus.innerHTML = ((battery.level * 100) + '%');
    let remaining;

    if (battery.dischargingTime === Infinity) {
        remaining = "Je apparaat zal niet uitgaan zolang je aan de stroom zit aangesloten!";
    } else {
        remaining = "Je apparaat zal uitgaan over " + (battery.dischargingTime / 60 / 60).toFixed(2) + " hours left";
    }

    $targetRemaining.innerHTML = remaining;
}

