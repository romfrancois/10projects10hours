const todos = document.getElementsByClassName('todos')[0];

function handleClick(event) {
    var targetID = event.target.getAttribute("id");
    var targetParentNodeID = event.target.parentNode.getAttribute("id");

    let currentElement = targetID ? document.getElementById(targetID) : document.getElementById(targetParentNodeID);

    if (event.type === "contextmenu") {
        todos.removeChild(currentElement);
    } else {
        currentElement.firstElementChild.classList.toggle('strikethrough');
    }

    event.preventDefault();
}

function addToDo(todo) {
    const divElement = document.createElement("div");
    divElement.setAttribute("id", `todo-${Math.round(Math.random() * 10)}`);
    divElement.classList.add("todo");

    const labelElement = document.createElement("label");
    labelElement.innerText = todo;

    divElement.appendChild(labelElement);
    todos.appendChild(divElement);
}

function handleAddToDo(event) {
    event.preventDefault();

    const todoElement = document.getElementById('addTodoInput');
    const todo = todoElement.value;

    if (todo.length > 0) {
        addToDo(todo);
        todoElement.value = "";
    }
}

// Left click
todos.addEventListener("click", handleClick);

// Right click
todos.addEventListener("contextmenu", handleClick);

const form = document.getElementsByTagName('form')[0]; //.getElementById('addTodoInput');
form.addEventListener('submit', handleAddToDo);