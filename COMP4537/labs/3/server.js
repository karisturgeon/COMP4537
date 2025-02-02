let http = require(`http`);
let url = require(`url`);
const MESSAGES = require(`./lang/en/en`);
const utils = require(`./modules/utils`);
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    const name = q.query.name;
    const text = q.query.text;




    console.log("Request for:", q.pathname);


    if (q.pathname.startsWith(`/COMP4537/labs/3/getDate/`)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(utils.getDate(name, MESSAGES));
        res.end();
    }

    else if (q.pathname.startsWith(`/COMP4537/labs/3/writeFile/`)) {
        utils.writeFile(text, (status) => {
            res.writeHead(status, { 'Content-Type': 'text/html' });
            if (status == 500) {
                res.write("Error appending to file");
            } else {
                res.write("File appended successfully");
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
        utils.readFile(fileName, (err, data) => {
            if (err) {
                console.log("Error reading file: ", err);
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write(`<h1>04 File Not Found: </h1>` + fileName);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
            }
            res.end();
        });
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write("<h1>404 Not Found</h1>" + q.pathname + " not found");
        res.end();
    }

}).listen(PORT, HOST, () => console.log("Server running on http://localhost:3000"));