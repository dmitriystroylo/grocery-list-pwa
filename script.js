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
  saved.forEach(({text, crossed}) => addItem(text, crossed));
});

function addItem(text, crossedOut = false) {
  const li = document.createElement('li');
  li.textContent = text;
  if (crossedOut) li.classList.add('crossed');

  const btnContainer = document.createElement('div');
  btnContainer.className = 'item-buttons';

  const crossBtn = document.createElement('button');
  crossBtn.textContent = '✔️';
  crossBtn.title = 'Cross Out';
  crossBtn.onclick = () => {
    li.classList.toggle('crossed');
    saveList();
  };

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '🗑️';
  removeBtn.title = 'Remove';
  removeBtn.onclick = () => {
    li.remove();
    saveList();
  };

  btnContainer.append(crossBtn, removeBtn);
  li.appendChild(btnContainer);
  list.appendChild(li);
}

function saveList() {
  const items = Array.from(list.children).map(li => ({
    text: li.firstChild.textContent,
    crossed: li.classList.contains('crossed')
  }));
  localStorage.setItem('groceryList', JSON.stringify(items));
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

// Help popup logic
const helpBtn = document.getElementById('helpBtn');
const helpPopup = document.getElementById('helpPopup');
const closeHelp = document.getElementById('closeHelp');

helpBtn.addEventListener('click', () => {
  helpPopup.classList.remove('hidden');
});

closeHelp.addEventListener('click', () => {
  helpPopup.classList.add('hidden');
});