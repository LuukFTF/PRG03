let paragraphElements = document.querySelectorAll('.paragraph');
console.log(paragraphElements);

let button = document.getElementById('button');
button.addEventListener('click', function(){addItem()});

// met input boodschappen lijstje

function addItem() {
    let content = prompt("what you wanna add bro?", "bruh item");
    let list = document.getElementById('todo');
    let listItem = document.createElement('li');
    listItem.innerHTML = content;
    list.appendChild(listItem);
}