// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:timestamp?", (req, res) => {
    let date;
    if (req.params.timestamp) {
        const isUnix = Number(req.params.timestamp);
        date = Number.isNaN(isUnix) ? Date.parse(req.params.timestamp) : isUnix;
        if (Number.isNaN(date)) {
            res.json({ error: "Invalid Date" });
        }
    }
    const parsedDate = date ? new Date(date) : new Date();
    res.json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
