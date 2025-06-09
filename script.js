const input = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const list = document.getElementById('groceryList');

addButton.addEventListener('click', () => {
  const value = input.value.trim();
  if (value !== '') {
    addItem(value);
    saveList();
    input.value = '';
  }
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addButton.click();
});

document.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('groceryList')) || [];
  saved.forEach(text => addItem(text));
});

function addItem(text) {
  const li = document.createElement('li');
  li.textContent = text;

  const btnContainer = document.createElement('div');
  btnContainer.className = 'item-buttons';

  const crossBtn = document.createElement('button');
  crossBtn.textContent = 'Cross Out';
  crossBtn.onclick = () => li.classList.toggle('crossed');

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.onclick = () => {
    li.remove();
    saveList();
  };

  btnContainer.append(crossBtn, removeBtn);
  li.appendChild(btnContainer);
  list.appendChild(li);
}

function saveList() {
  const items = Array.from(list.children).map(li => li.firstChild.textContent);
  localStorage.setItem('groceryList', JSON.stringify(items));
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}