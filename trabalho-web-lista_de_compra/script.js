const input = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const shoppingList = document.getElementById('shoppingList');


let items = JSON.parse(localStorage.getItem('shoppingListItems')) || [];

function saveToLocalStorage() {
  localStorage.setItem('shoppingListItems', JSON.stringify(items));
}

function renderList() {
  shoppingList.innerHTML = '';
  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item.name;
    if(item.comprado) li.classList.add('comprado');


    li.addEventListener('click', () => {
      items[index].comprado = !items[index].comprado;
      saveToLocalStorage();
      renderList();
    });
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      items.splice(index, 1);
      saveToLocalStorage();
      renderList();
    });

    li.appendChild(removeBtn);
    shoppingList.appendChild(li);
  });
}

addButton.addEventListener('click', () => {
  const newItem = input.value.trim();
  if(newItem) {
    items.push({ name: newItem, comprado: false });
    saveToLocalStorage();
    renderList();
    input.value = '';
    input.focus();
  }
});

input.addEventListener('keypress', e => {
  if(e.key === 'Enter') addButton.click();
});

renderList();
