window.addEventListener('load', init);

//Global vars
let $form;
let $nameField;
let $ageField;
let $deleteButton;

function init() {
    if (typeof window.localStorage === "undefined") {
        console.error('Local storage is not available in your browser');
        return;
    }

    $form = document.getElementById('form');
    $nameField = document.getElementById('name');
    $ageField = document.getElementById('age');
    $deleteButton = document.getElementById('delete');

    fillFieldsFromLocalStorage();
    $form.addEventListener('submit', formSubmitHandler);
    $deleteButton.addEventListener('click', deleteClickHandler);
}

/**
 * Is local storage is available on page load? Let's fill the form
 */
function fillFieldsFromLocalStorage() {
    
}

/**
 * After submitting the form, let's save the values in the local storage
 *
 * @param e
 */
function formSubmitHandler(e) {
    
}

/**
 * Make sure we clean up the local storage again
 *
 * @param e
 */
function deleteClickHandler(e) {
    
}
