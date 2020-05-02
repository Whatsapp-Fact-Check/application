require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const bus = require('./eventBus');
const wpp = require('./whatsapp');

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/wppMessage', function (req, res) {
    console.log("Received wpp msg request")

    let body = req.body.Body;
    wpp.processWppMessage(body, (userResponse) => {
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(userResponse);
        console.log("Returned answer to user\n");
    });
});

app.post('/statusCallback', function (req, res) {
    // console.log("Received status callback");
    // let body = req.body;
    // console.log(body);
    res.status(200).end("ok");

});


app.listen(process.env.server_port, function (err) {
    if (err) {
        throw err
    }
    console.log('Example app listening on port 8080!');
});

bus.addEventListener('receivedGoogleResponse', (result_message) => {
    console.log("Event bus: Received google response");
});


