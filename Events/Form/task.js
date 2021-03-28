window.addEventListener('load', init);

/**
 * Execute after document is fully loaded
 */
function init() {
    //Get the form & listen to submit event
    let form = document.getElementById('new-todo-form');
    form.addEventListener('submit', addItem)
}

/**
 * Add the new item to the list
 *
 * @param e
 */
function addItem(e) {
    e.preventDefault();

    let content = document.getElementById('todo-input').value;
    let list = document.getElementById('todo');
    let listItem = document.createElement('li');
    listItem.innerHTML = content;
    list.appendChild(listItem);

    document.getElementById('todo-input').value = ''
}
