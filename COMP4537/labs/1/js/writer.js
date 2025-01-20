const notesContainer = document.getElementById('notes-container');
const lastSaved = document.getElementById('last-saved');
const addNoteButton = document.getElementById('add-note-button');
const backButton = document.getElementById('back-button');

addNoteButton.innerText = MESSAGES.addButton;
backButton.innerText = MESSAGES.backButton;

let notesArray = [];

function NoteObject(text = ""){
    this.text = text;
}

function createNoteElement(note, index) {

    const wrapper = document.createElement("div");
    const textbox = document.createElement("input");
    textbox.type = "text";
    textbox.value = note.text;
    textbox.className = 'writer-note';
    textbox.addEventListener('input', (e) => {
        notesArray[index].text = e.target.value;
        saveNotes();
    });

    const removeButton = document.createElement("button");
    removeButton.innerText = MESSAGES.removeButton;
    removeButton.addEventListener("click", () => {
        notesArray.splice(index, 1); 
        loadNotesToWriter();
        saveNotes();
    });

    wrapper.appendChild(textbox);
    wrapper.appendChild(removeButton);
    return wrapper;
}


const loadNotesToWriter = () => {
    notesContainer.innerHTML = '';
    notesArray.forEach((note, index) => {
        const noteElement = createNoteElement(note, index);
        notesContainer.appendChild(noteElement);
    });
}

const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notesArray));
    const now = new Date();
    lastSaved.innerText = `${MESSAGES.updateMessage} ${now.toLocaleString()}`;
}

function loadNotesFromLocalStorage() {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    notesArray = storedNotes.map(note => new NoteObject(note.text)); // Convert plain objects to NoteObject instances
    loadNotesToWriter();
}

addNoteButton.addEventListener('click', () => {
    notesArray.push(new NoteObject());
    loadNotesToWriter();
    saveNotes();
});


loadNotesFromLocalStorage();
saveNotes();
// setInterval(saveNotes, 2000);
