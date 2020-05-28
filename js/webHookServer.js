"use strict";
/**
 * É o express server que recebe o request, monsta um objeto MessageRequest e manda pro MessageRouter
 *
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHookServer = void 0;
const tslib_1 = require("tslib");
const wppMessageParser_1 = require("./messageRequest/wppMessageParser");
const messageRouter_1 = require("./messageRouter/messageRouter");
const express = require('express');
const bodyParser = require('body-parser');
class WebHookServer {
    constructor(port) {
        this.app = express();
        this.messageRouter = new messageRouter_1.MessageRouter();
        this.messageParsers = {};
        this.messageParsers["wpp"] = new wppMessageParser_1.WppMessageParser(); //TODO later -change to annotation and automatic implementation (same as messageRouter)
        this.port = port;
        this.setupBodyParser();
        this.setupRoutes();
    }
    startServer() {
        this.app.listen(this.port, (err) => {
            if (err) {
                throw err;
            }
            console.log('WhatsappFactCheck app listening on port ' + this.port);
        });
    }
    setupBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    setupRoutes() {
        this.app.get('/', (req, res) => {
            res.end("Whatsapp Fact Check Server...");
        });
        this.app.post('/wppMessage', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log("Received wpp msg request");
            // console.log(req.body);
            let body = req.body.Body;
            let userResponse = yield this.messageRouter.processMessage(this.messageParsers["wpp"].parse(body));
            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(userResponse);
            console.log("Returned answer to user\n");
        }));
        this.app.post('/statusCallback', (req, res) => {
            // console.log("Received status callback");
            res.status(200).end("ok");
        });
    }
}
exports.WebHookServer = WebHookServer;
//# sourceMappingURL=webHookServer.js.map