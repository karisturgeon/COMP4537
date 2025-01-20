/**
 * Kari Sturgeon
 * Lab 1
 * ChatGPT was used for this lab. (brainstorming, troubleshooting, refining the code, etc.)
 */


const notesDisplay = document.getElementById('reader-container');
const lastUpdate = document.getElementById('last-update');
const backButton = document.getElementById('back-button');

backButton.innerText = MESSAGES.backButton;

backButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

const loadNotesToReader = () => {

    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    notesDisplay.innerHTML = '';

    const wrapper = document.createElement("div");
    wrapper.className = 'reader-note-wrapper';
    storedNotes.forEach(note => {
        const noteTextbox = document.createElement('textarea');
        noteTextbox.value = note.text || '';
        noteTextbox.readOnly = true;
        noteTextbox.className = 'reader-note';
        wrapper.appendChild(noteTextbox);
    });
    notesDisplay.appendChild(wrapper);
    const now = new Date();
    lastUpdate.innerText = `${MESSAGES.updateMessage} ${now.toLocaleString()}`;
};

setInterval(loadNotesToReader, 2000);
loadNotesToReader();

