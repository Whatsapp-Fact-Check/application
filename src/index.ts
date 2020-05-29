import dotenv from "dotenv"
dotenv.config()
const port = Number(process.env.PORT) || 11000
import { WebHookServer } from "./webHookServer"
const server = new WebHookServer(port)
server.startServer()
