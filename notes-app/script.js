const notes = document.getElementsByClassName('notes')[0];

function handleActions(event) {
    var targetID = event.target.parentNode.parentNode.getAttribute("id");

    let currentElement = document.getElementById(targetID);

    const isActionEdit = event.target.className.indexOf("edit") !== -1;

    if (isActionEdit) {
        const textAreaElement = currentElement.getElementsByTagName("textarea")[0];
        textAreaElement.disabled = !textAreaElement.disabled;
    } else {
        notes.removeChild(currentElement);
    }

    event.preventDefault();
}


function handleAddNode() {
    const noteElement = document.createElement("div");
    noteElement.setAttribute("id", `note-${Math.round(Math.random() * 100)}`);
    noteElement.classList.add("note");
    
    const iEditElement = document.createElement("i");
    iEditElement.classList.add("far");
    iEditElement.classList.add("fa-edit");
    iEditElement.addEventListener("click", handleActions);
    
    const iTrashElement = document.createElement("i");
    iTrashElement.classList.add("fa");
    iTrashElement.classList.add("fa-trash");
    iTrashElement.addEventListener("click", handleActions);

    const headerElement = document.createElement("header");
    headerElement.appendChild(iEditElement);
    headerElement.appendChild(iTrashElement);

    const padElement = document.createElement("div");
    padElement.classList.add("pad");

    const textAreaElement = document.createElement("textarea");

    padElement.appendChild(textAreaElement);

    noteElement.appendChild(headerElement);
    noteElement.appendChild(padElement);

    notes.appendChild(noteElement);
}

const addNoteBtn = document.getElementsByTagName("button")[0];
addNoteBtn.addEventListener("click", handleAddNode);