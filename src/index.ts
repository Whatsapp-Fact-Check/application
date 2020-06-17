import { config } from "dotenv"
config()
const port = Number(process.env.PORT) || 11000
import { WebHookServer } from "./webHookServer"
const server = new WebHookServer(port)
server.startServer()

/**
 * Commit to access previous codebase
 * https://github.com/Whatsapp-Fact-Check/application/tree/466a8f9691bb4d56ec6563f3f351a51a565e6fce
 */