const input = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const list = document.getElementById('groceryList');
const langSwitch = document.getElementById('langSwitch');
const title = document.getElementById('title');

let lang = localStorage.getItem('preferredLang') || (navigator.language.startsWith('ru') ? 'ru' : 'en');
langSwitch.value = lang;
applyTranslations();

langSwitch.addEventListener('change', (e) => {
  lang = e.target.value;
  localStorage.setItem('preferredLang', lang);
  applyTranslations();
});

function applyTranslations() {
  const t = translations[lang];
  title.textContent = t.title;
  input.placeholder = t.placeholder;
  addButton.textContent = t.add;

  Array.from(document.querySelectorAll('.cross-button')).forEach(btn => btn.textContent = t.cross);
  Array.from(document.querySelectorAll('.remove-button')).forEach(btn => btn.textContent = t.remove);
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('groceryList')) || [];
  saved.forEach(({ text, crossed }) => addItem(text, crossed));
});

addButton.addEventListener('click', () => {
  const value = input.value.trim();
  if (value !== '') {
    addItem(value, false);
    saveList();
    input.value = '';
  }
});

// NEW: Pressing Enter also adds item
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    addButton.click();
  }
});

function addItem(text, crossedOut) {
  const li = document.createElement('li');
  if (crossedOut) li.classList.add('crossed');
  li.textContent = text;

  const btnContainer = document.createElement('div');
  btnContainer.className = 'item-buttons';

  const crossBtn = document.createElement('button');
  crossBtn.className = 'cross-button';
  crossBtn.textContent = translations[lang].cross;
  crossBtn.onclick = () => {
    li.classList.toggle('crossed');
    saveList();
  };

  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-button';
  removeBtn.textContent = translations[lang].remove;
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