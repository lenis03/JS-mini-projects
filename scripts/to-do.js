const toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];

renderToDoList();

function renderToDoList() {
  let toDoListHTML = '';

  toDoList.forEach((toDoObject, index) => {
    const { name, dueDate } = toDoObject;

    toDoListHTML += `
      <div>
        ${name}
      </div>
      <div>
        ${dueDate}
      </div>
      <button class="delete-todo-button js-delete-todo-button">
        Delete
      </button>
    `;
  });

  document.querySelector('.js-to-do-list-container').innerHTML = toDoListHTML;

  document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      toDoList.splice(index, 1);

      renderToDoList();
      saveToStorage();
    });
  });
}

document.querySelector('.js-add-todo-list').addEventListener('click', () => {
  addToList();
});

function addToList() {
  const toDoElem = document.querySelector('.js-to-do-input');
  const dueDateElem = document.querySelector('.js-due-date-input');

  const name = toDoElem.value;
  const dueDate = dueDateElem.value;

  toDoList.push({
    name,
    dueDate
  });

  toDoElem.value = '';

  renderToDoList();
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('toDoList', JSON.stringify(toDoList));
}