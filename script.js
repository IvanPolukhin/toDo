const list = document.getElementsByClassName('list')[0];

function addItem() {
    const input = document.querySelector('.app-input');
    const itemText = input.value;
    if (itemText === '') return
    input.value = '';
    const item = document.createElement('div');
    item.innerHTML = `
    <div class="maxW">${itemText}</div>
    <div>
    <button class="btn delete-btn">X</button>
    <button class="btn edit-btn">Edit</button>
    </div>
    `;
    list.appendChild(item);
    addDelete();
    addEdit();
}

function addClear() {
    const listItem = list.querySelectorAll('.list > div:not(:first-child)');
    listItem.forEach(item => {
        item.remove();
    });
}

function deleteItem(event) {
    event.target.parentElement.remove();
}

function editItem(event) {
    const currentItem = event.target.parentElement;
    const itemText = currentItem.firstChild.textContent;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = itemText;

    currentItem.replaceChild(input, currentItem.firstChild);

    function saveChanges() {
        const newText = input.value.trim();
        if (newText !== '') {
            currentItem.firstChild.textContent = newText;
        } else {
            alert('Пожалуйста, введите текст.');
        }

        currentItem.replaceChild(document.createTextNode(currentItem.firstChild.textContent), input);
    }

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            saveChanges();
        }
    });

    input.addEventListener('blur', function () {
        saveChanges();
    });

    input.focus();
}


function addDelete() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', deleteItem);
    });
}

function addEdit() {
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(editButton => {
        editButton.addEventListener('click', editItem);
    });
}

document.getElementById('add').addEventListener('click', addItem);
document.getElementById('clear').addEventListener('click', addClear);

addDelete();
addEdit();