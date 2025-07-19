let todo_ul = document.getElementById("ulList");
let todo_form = document.querySelector("form");
let todo_text = document.getElementById("todoText");

let allTodo = getToDo();
console.log(allTodo);
displayToDo();

const MOD = mode.querySelector("input");
MOD.addEventListener("change", () => {
  let element = document.body;
  element.classList.toggle("darkMode");
});

todo_form.addEventListener("submit", function (e) {
  e.preventDefault();

  addToDo();
  saveToDo();
});

function addToDo() {
  let todo_input = todo_text.value.trim();
  if (todo_input.length > 0) {
    todoObject = {
      text: todo_input,
      complete: false,
    };
    allTodo.push(todoObject);
    displayToDo(todo_input);
    saveToDo();
    todo_text.value = "";
  }
}

function displayToDo() {
  todo_ul.innerHTML = "";
  allTodo.forEach((todo, todoIndex) => {
    const todoItem = createToDo(todo, todoIndex);
    todo_ul.append(todoItem);
  });
}

function createToDo(todo, todoIndex) {
  const todoID = "todo-" + todoIndex;
  const todo_item = document.createElement("li");
  const todoObj_text = todo.text;
  todo_item.className = "todoList";
  todo_item.innerHTML = `
        <input id="${todoID}" type="checkbox" />
          <label class="customCheck" for="${todoID}">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </label>
          <label for="${todoID}" class="ItemText"> ${todoObj_text} </label>
          <button id="deleteBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </button>
    `;
  const checkbox = todo_item.querySelector("input");
  checkbox.addEventListener("change", () => {
    allTodo[todoIndex].complete = checkbox.checked;
    saveToDo();
  });
  checkbox.checked = todo.complete;
  const deleteButton = todo_item.querySelector("#deleteBtn");

  deleteButton.addEventListener("click", () => {
    deleteToDo(todoIndex);
  });
  return todo_item;
}

function saveToDo() {
  const todoJson = JSON.stringify(allTodo);
  localStorage.setItem("todos", todoJson);
}

function getToDo() {
  const todoGET = localStorage.getItem("todos") || "[]";
  return JSON.parse(todoGET);
}

function deleteToDo(todoIndex) {
  allTodo = allTodo.filter((_, i) => i != todoIndex);
  saveToDo();
  displayToDo();
}
