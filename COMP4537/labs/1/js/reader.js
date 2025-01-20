const notesDisplay = document.getElementById('reader-container');
const lastUpdate = document.getElementById('last-update');
const backButton = document.getElementById('back-button');

backButton.innerText = MESSAGES.backButton;

const loadNotesToReader = () => {

    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    notesDisplay.innerHTML = '';

    const wrapper = document.createElement("div");
    storedNotes.forEach(note => {
        const noteTextbox = document.createElement('input');
        noteTextbox.type = 'text';
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

backButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});