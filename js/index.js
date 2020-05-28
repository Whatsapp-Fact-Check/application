"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const webHookServer_1 = require("./webHookServer");
const server = new webHookServer_1.WebHookServer(Number(process.env.PORT));
server.startServer();
//# sourceMappingURL=index.js.map