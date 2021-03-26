//Get the button & add event
let button = document.getElementById('button');
button.addEventListener('click', addItem);

/**
 * Add the new item to the list
 */

function addItem() {
    let list = document.getElementById('todo');
    let listItem = document.createElement('li');
    listItem.innerHTML = 'Watch the new X-Files';
    list.appendChild(listItem);
}
