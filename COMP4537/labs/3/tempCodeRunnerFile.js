http.createServer(function (req, res) {
    const q = url.parse(req.url, true);
    const filename = "." + q.pathname;
    console.log(filename);
    fs.readFile(filename, function (err, data) {
    if (err) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    return res.end(q.pathname + " 404 Not Found!");
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
    });
    }).listen(8888)