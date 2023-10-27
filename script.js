const todoList = document.getElementById("todo-list");
const clearBtn = document.getElementById("clear-all");
const filter = document.getElementById("filter-todo");
const addTodo = document.getElementById("todo-form");
// console.log(todoList);

function addTodos(e) {
  e.preventDefault();
  let newItem = document.getElementById("item-todo").value;
  // console.log(newItem);
  if (newItem === "") {
    alert("Please enter proper todo!");
    return;
  }

  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const i = createDeleteButton("remove-todo");
  li.appendChild(i);

  todoList.appendChild(li);
  document.getElementById("item-todo").value = "";
  checkUI();
}

function createDeleteButton(classes) {
  const i = document.createElement("i");
  i.classList = classes;
  i.appendChild(document.createTextNode("X"));
  return i;
}

function deleteTodo(e) {
  if (e.target.classList.contains("remove-todo")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.remove();
    }
  }
  checkUI();
}

function filterTodo(e) {
  const value = filter.value.trim().toLowerCase();
  // console.log(value);
  const lists = todoList.querySelectorAll("li");
  lists.forEach((todo) => {
    if (todo.innerText.toLowerCase().indexOf(value) != -1) {
      todo.style.display = "block";
    } else {
      todo.style.display = "none";
    }
  });
}

function deleteAllTodo() {
  if (confirm("Do you really want to delete all todos?")) {
    while (todoList.firstChild) {
      todoList.removeChild(todoList.firstChild);
    }
  }
  checkUI();
}

function checkUI() {
  const lists = todoList.querySelectorAll("li");
  if (lists.length === 0) {
    todoList.style.display = "none";
    clearBtn.style.visibility = "hidden";
    filter.style.visibility = "hidden";
  } else {
    todoList.style.display = "flex";
    clearBtn.style.visibility = "visible";
    filter.style.visibility = "visible";
  }

  if (lists.length > 30) {
    todoList.style.height = "280px";
    todoList.style.overflowY = "scroll";
  }
}

addTodo.addEventListener("submit", addTodos);
todoList.addEventListener("click", deleteTodo);
filter.addEventListener("input", filterTodo);
clearBtn.addEventListener("click", deleteAllTodo);
checkUI();
