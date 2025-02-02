class DateHandler {

    getDate(name, MESSAGES) {
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
}


module.exports = DateHandler;