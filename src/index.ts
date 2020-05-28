require('dotenv').config();

import { WebHookServer } from './webHookServer';
const server = new WebHookServer(Number(process.env.PORT));
server.startServer();