const list = document.getElementsByClassName('list')[0];

function addItem() {
    const input = document.querySelector('.app-input');
    const itemText = input.value.trim();
    if (!itemText) return;
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
    addEdit();
}


function addClear() {
    const listItem = list.querySelectorAll('.list > div:not(:first-child)');
    listItem.forEach(item => {
        item.remove();
    });
}

function deleteItem(event) {
    event.target.closest('.list > div').remove();
}

function editItem(event) {
    const currentItem = event.target.closest('.list > div');
    const itemTextElement = currentItem.querySelector('.maxW');

    if (!itemTextElement) return;

    const itemText = itemTextElement.textContent.trim();
    const input = document.createElement('input');
    input.type = 'text';
    input.value = itemText;

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const newText = input.value.trim();
            if (newText !== '') {
                itemTextElement.textContent = newText;
                currentItem.replaceChild(itemTextElement, input);
            } else {
                alert('Пожалуйста, введите текст.');
            }
        }
    });

    input.addEventListener('blur', function () {
        const newText = input.value.trim();
        if (newText !== '') {
            itemTextElement.textContent = newText;
            currentItem.replaceChild(itemTextElement, input);
        } else {
            alert('Пожалуйста, введите текст.');
        }
    });

    currentItem.replaceChild(input, itemTextElement);

    input.focus();
}

function addDelete() {
    list.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            deleteItem(event);
        }
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