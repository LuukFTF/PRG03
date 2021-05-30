window.addEventListener('load', init);
let ul;

/**
 * Execute after document is fully loaded
 */
function init() {
    let form = document.getElementById('new-todo-form');
    form.addEventListener('submit', formSubmitHandler);

    ul = document.getElementById('todo');
    ul.addEventListener('click', liClickHandler);
}

/**
 * Handler for the form submit event
 *
 * @param e
 */
function formSubmitHandler(e) {
    e.preventDefault(); //Leave this one out to see te result

    //Get value from input
    let textInput = document.getElementById('todo-input').value;


    //Create new li element
    let li = document.createElement('li');
    li.innerHTML = textInput;


    //Empty the current form item so we can add another
    document.getElementById('todo-input').value = "";
    document.getElementById('message').innerHTML = textInput + " is toegevoegd";

    //Add item to the list
    ul.appendChild(li);
}

/**
 * Handler for clicking on a list item
 *
 * @param e
 */
function liClickHandler(e) {
    let clickedItem = e.target;

    if (clickedItem.nodeName === 'LI') {
        clickedItem.classList.toggle('yellow');
    }
}
