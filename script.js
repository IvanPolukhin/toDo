const list = document.getElementsByClassName('list')[0];

function addItem() {
    const itemText = prompt('What to add?') || 'empty';
    const item = document.createElement('div');
    item.innerHTML = `${itemText}<button class="btn delete-btn">X</button>`;
    list.appendChild(item);
    addDelete();
}

function addClear() {
    list.innerHTML = '';
}

function deleteItem(event) {
    event.target.parentElement.remove();
}

function addDelete() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', deleteItem);
    });
}

document.getElementById('add').addEventListener('click', addItem);
document.getElementById('clear').addEventListener('click', addClear);

addDelete();