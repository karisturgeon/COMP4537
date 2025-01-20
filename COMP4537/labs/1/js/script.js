/**
 * Kari Sturgeon
 * Lab 1
 * ChatGPT was used for this lab. (brainstorming, troubleshooting, refining the code, etc.)
 */

const readerButton = document.getElementById('reader-button');
const writerButton = document.getElementById('writer-button');
const title = document.getElementById('title');
const header1 = document.getElementById('header1');
const header2 = document.getElementById('header2');


header1.innerText = MESSAGES.header1;
header2.innerText = MESSAGES.header2;
title.innerText = MESSAGES.title;
readerButton.innerText = MESSAGES.reader;
writerButton.innerText = MESSAGES.writer;

readerButton.addEventListener('click', () => {
    window.location.href = 'reader.html';
});

writerButton.addEventListener('click', () => {
    window.location.href = 'writer.html';
});