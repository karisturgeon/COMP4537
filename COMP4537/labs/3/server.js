let http = require(`http`);
let url = require(`url`);
const FileHandler = require("./modules/fileHandler");
const DateHandler = require("./modules/utils");
const MESSAGES = require("./lang/en/en.js");

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

const fileHandler = new FileHandler("./");
const dateHandler = new DateHandler();


class Server {
    constructor(port, host) {
        this.port = port;
        this.host = host;
    }

    start() {
        http.createServer((req, res) => {
            const q = url.parse(req.url, true);
            const name = q.query.name;
            const text = q.query.text;
        
            console.log("Request for:", q.pathname);
        
        
            if (q.pathname.startsWith(`/COMP4537/labs/3/getDate/`)) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(dateHandler.getDate(name, MESSAGES));
                res.end();
            }
        
            else if (q.pathname.startsWith(`/COMP4537/labs/3/writeFile/`)) {
                fileHandler.writeFile(text, (status) => {
                    res.writeHead(status, { 'Content-Type': 'text/html' });
                    if (status == 500) {
                        res.write(`<h2>Error appending to file</h2>`);
                    } else {
                        res.write(`<h2>File appended successfully</h2>`);
                    }
                    res.end();
                });
            }
        
            else if (q.pathname.startsWith(`/COMP4537/labs/3/readFile/`)) {
                let parts = q.pathname.split("/");
                let fileName = parts.pop() || parts.pop(); 
            
                if (!fileName) {
                  res.writeHead(400, { "Content-Type": "text/plain" });
                  res.end("No file name provided in the URL.");
                  return;
                }
                fileHandler.readFile(fileName, (err, data) => {
                    if (err) {
                        console.log("Error reading file: ", err);
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.write(`<h2>04 File Not Found: ` + fileName + `</h2>`);
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write(`<h3>` + data + `</h3>`);
                    }
                    res.end();
                });
            }
        
            else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write("<h2>404 Not Found</h2>" + q.pathname + " not found");
                res.end();
            }
        
        }).listen(this.port, this.host, () => console.log("Server running"));
    }
}

const server = new Server(PORT, HOST);
server.start();
