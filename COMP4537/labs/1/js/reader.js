/**
 * Kari Sturgeon
 * Lab 1
 * ChatGPT was used for this lab. (brainstorming, troubleshooting, refining the code, etc.)
 */


/**
 * ReaderNote class
 */
class ReaderNote {
    constructor(text = "") {
        this.text = text;
        this.element = this.createNoteElement()
    }
    createNoteElement() {
        const noteTextbox = document.createElement("textarea");
        noteTextbox.value = this.text || "";
        noteTextbox.readOnly = true;
        noteTextbox.className = "reader-note";
        return noteTextbox;
}}


const notesDisplay = document.getElementById('reader-container');
const lastUpdate = document.getElementById('last-update');
const backButton = document.getElementById('back-button');

backButton.innerText = MESSAGES.backButton;

backButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});


/**
 * Load notes to the reader container from local storage
 */
const loadNotesToReader = () => {

    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    notesDisplay.innerHTML = '';

    const wrapper = document.createElement("div");
    wrapper.className = 'reader-note-wrapper';

    storedNotes.forEach(noteData => {
        const note = new ReaderNote(noteData.text)
        note.className = 'reader-note';
        wrapper.appendChild(note.element);
    });

    notesDisplay.appendChild(wrapper);

    const now = new Date();
    lastUpdate.innerText = `${MESSAGES.updateMessage} ${now.toLocaleString()}`;
};

setInterval(loadNotesToReader, 2000);
loadNotesToReader();

