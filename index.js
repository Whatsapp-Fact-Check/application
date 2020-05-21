require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const bus = require('./eventBus');
const wpp = require('./whatsapp');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.end("Whatsapp Fact Check Server...");
});

app.post('/wppMessage', function (req, res) {
    console.log("Received wpp msg request")
    console.log(req.body);

    let body = req.body.Body;
    wpp.processWppMessage(body, (userResponse) => {
        res.writeHead(200, { 'Content-Type': 'text/xml' });
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


app.listen(process.env.PORT, function (err) {
    if (err) {
        throw err
    }
    console.log('Example app listening on port ' + process.env.PORT);
});

bus.addEventListener('receivedGoogleResponse', (result_message) => {
    console.log("Event bus: Received google response");
});


/* 

{
2020-05-21T16:39:56.477059+00:00 app[web.1]:   SmsMessageSid: 'SM4a0455e98829f1cf700f3d90bcb6ba9e',
2020-05-21T16:39:56.477060+00:00 app[web.1]:   NumMedia: '0',
2020-05-21T16:39:56.477061+00:00 app[web.1]:   SmsSid: 'SM4a0455e98829f1cf700f3d90bcb6ba9e',
2020-05-21T16:39:56.477062+00:00 app[web.1]:   SmsStatus: 'received',
2020-05-21T16:39:56.477062+00:00 app[web.1]:   Body: 'Corona',
2020-05-21T16:39:56.477063+00:00 app[web.1]:   To: 'whatsapp:+14155238886',
2020-05-21T16:39:56.477063+00:00 app[web.1]:   NumSegments: '1',
2020-05-21T16:39:56.477063+00:00 app[web.1]:   MessageSid: 'SM4a0455e98829f1cf700f3d90bcb6ba9e',
2020-05-21T16:39:56.477064+00:00 app[web.1]:   AccountSid: 'AC5ff7c51d0353defc0c23d900bde707b0',
2020-05-21T16:39:56.477064+00:00 app[web.1]:   From: 'whatsapp:+556199822909',
2020-05-21T16:39:56.477065+00:00 app[web.1]:   ApiVersion: '2010-04-01' 
}
{
2020-05-21T16:27:42.796478+00:00 app[web.1]:   MediaContentType0: 'image/jpeg',
2020-05-21T16:27:42.796479+00:00 app[web.1]:   SmsMessageSid: 'MM7cad34e23df0497dd1515c31ec0b91bb',
2020-05-21T16:27:42.796479+00:00 app[web.1]:   NumMedia: '1',
2020-05-21T16:27:42.796479+00:00 app[web.1]:   SmsSid: 'MM7cad34e23df0497dd1515c31ec0b91bb',
2020-05-21T16:27:42.796480+00:00 app[web.1]:   SmsStatus: 'received',
2020-05-21T16:27:42.796481+00:00 app[web.1]:   Body: '',
2020-05-21T16:27:42.796481+00:00 app[web.1]:   To: 'whatsapp:+14155238886',
2020-05-21T16:27:42.796482+00:00 app[web.1]:   NumSegments: '1',
2020-05-21T16:27:42.796482+00:00 app[web.1]:   MessageSid: 'MM7cad34e23df0497dd1515c31ec0b91bb',
2020-05-21T16:27:42.796483+00:00 app[web.1]:   AccountSid: 'AC5ff7c51d0353defc0c23d900bde707b0',
2020-05-21T16:27:42.796483+00:00 app[web.1]:   From: 'whatsapp:+556199822909',
2020-05-21T16:27:42.796483+00:00 app[web.1]:   MediaUrl0:
2020-05-21T16:27:42.796514+00:00 app[web.1]:    'https://api.twilio.com/2010-04-01/Accounts/AC5ff7c51d0353defc0c23d900bde707b0/Messages/MM7cad34e23df0497dd1515c31ec0b91bb/Media/ME0a9554a5fb9a33d03dae58672e7d8ee6',
2020-05-21T16:27:42.796515+00:00 app[web.1]:   ApiVersion: '2010-04-01' }


{
2020-05-21T16:33:25.617265+00:00 app[web.1]:   MediaContentType0: 'video/mp4',
2020-05-21T16:33:25.617266+00:00 app[web.1]:   SmsMessageSid: 'MMc10ceeab3a290352ad8832652770a3da',
2020-05-21T16:33:25.617266+00:00 app[web.1]:   NumMedia: '1',
2020-05-21T16:33:25.617267+00:00 app[web.1]:   SmsSid: 'MMc10ceeab3a290352ad8832652770a3da',
2020-05-21T16:33:25.617267+00:00 app[web.1]:   SmsStatus: 'received',
2020-05-21T16:33:25.617268+00:00 app[web.1]:   Body: '',
2020-05-21T16:33:25.617269+00:00 app[web.1]:   To: 'whatsapp:+14155238886',
2020-05-21T16:33:25.617269+00:00 app[web.1]:   NumSegments: '1',
2020-05-21T16:33:25.617270+00:00 app[web.1]:   MessageSid: 'MMc10ceeab3a290352ad8832652770a3da',
2020-05-21T16:33:25.617270+00:00 app[web.1]:   AccountSid: 'AC5ff7c51d0353defc0c23d900bde707b0',
2020-05-21T16:33:25.617271+00:00 app[web.1]:   From: 'whatsapp:+556199822909',
2020-05-21T16:33:25.617271+00:00 app[web.1]:   MediaUrl0:
2020-05-21T16:33:25.617272+00:00 app[web.1]:    'https://api.twilio.com/2010-04-01/Accounts/AC5ff7c51d0353defc0c23d900bde707b0/Messages/MMc10ceeab3a290352ad8832652770a3da/Media/MEb0766163fb4af75dae83ed96b95bd5a1'


*/
