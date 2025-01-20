/**
 * Kari Sturgeon
 * Lab 1
 * ChatGPT was used for this lab. (brainstorming, troubleshooting, refining the code, etc.)
 */



class Note {
    constructor(text = "") {
        this.text = text;
        this.element = this.createNoteElement()
    }

    createNoteElement() {
        const wrapper = document.createElement("div");
        wrapper.className = 'writer-note-wrapper';

        const textbox = document.createElement("textarea");
        textbox.value = this.text;
        textbox.className = 'writer-note';
        textbox.addEventListener('input', (e) => {
            const index = notesArray.indexOf(this);
            notesArray[index].text = e.target.value;
            saveNotes();
        });

        const removeButton = document.createElement("button");
        removeButton.innerText = MESSAGES.removeButton;
        removeButton.addEventListener("click", () => {
            this.remove()
        });


        wrapper.appendChild(textbox);
        wrapper.appendChild(removeButton);
        return wrapper;
    }

    remove() {
        const index = notesArray.indexOf(this);
        if (index !== -1) {
            notesArray.splice(index, 1);
            loadNotesToWriter();
            saveNotes();
        }
    }
}


let notesArray = [];

const notesContainer = document.getElementById('notes-container');
const lastSaved = document.getElementById('last-saved');
const addNoteButton = document.getElementById('add-note-button');
const backButton = document.getElementById('back-button');

addNoteButton.innerText = MESSAGES.addButton;
backButton.innerText = MESSAGES.backButton;


backButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});



const loadNotesToWriter = () => {
    notesContainer.innerHTML = '';
    notesArray.forEach((note) => {
        notesContainer.appendChild(note.element);
    });
}

const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notesArray.map((note) => ({ text: note.text }))));
    const now = new Date();
    lastSaved.innerText = `${MESSAGES.updateMessage} ${now.toLocaleString()}`;
}

function loadNotesFromLocalStorage() {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    notesArray = storedNotes.map(note => new Note(note.text)); // Convert plain objects to Note instances
    loadNotesToWriter();
}

addNoteButton.addEventListener('click', () => {
    notesArray.push(new Note());
    loadNotesToWriter();
    saveNotes();
});


loadNotesFromLocalStorage();
saveNotes();

