const fs = require("fs");
const filepath = "./";

function getDate(name, MESSAGES) {
    const now = new Date();
    const message = MESSAGES.mainMessage.replace("%1", name) + now;
    return `
        <html>
            <head>
                <title>Lab 3</title>
            </head>
            <body>
                <p style="color: blue; font-size: 20px;">${message}</p>
            </body>
        </html>
    `;
}

function writeFile(text, callback) {
    const filename = filepath + "file.txt";
    fs.appendFile(filename, text + "\n", (err) =>{
        if (err) {
            console.error("error appending to file: ", err);
            callback(500);
        } else {
            callback(200);
        }
    });
}

function readFile(file, callback) {
    const filename = filepath + file;
    fs.readFile(filename, "utf8", (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}

module.exports = { getDate, writeFile, readFile };