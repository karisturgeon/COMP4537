const fs = require("fs");
const path = require("path");

class FileHandler {
    constructor(basePath = "/") {
        this.basePath = basePath;
    }


writeFile(text, callback) {
    const filename = path.join(this.basePath, "file.txt")
    fs.appendFile(filename, text + "\n", (err) =>{
        if (err) {
            console.error("error appending to file: ", err);
            callback(500);
        } else {
            callback(200);
        }
    });
}

readFile(file, callback) {
    const filename = path.join(this.basePath, file);    fs.readFile(filename, "utf8", (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
}
}module.exports = FileHandler;