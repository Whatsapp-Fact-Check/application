/**
 *  * É o express server que recebe o request, monta um objeto MessageRequest e manda pro MessageRouter
 *
 *  */

import { MessageParser } from "./messageRequest/messageParser"
import { WppMessageParser } from "./messageRequest/wppMessageParser"
import { MessageRouter } from "./messageRouter/messageRouter"
import express from "express"
import bodyParser from "body-parser"

export class WebHookServer {
  private port: number
  private app: any = express()
  private messageRouter: MessageRouter = new MessageRouter()
  private messageParsers: Record<string, MessageParser> = {}

  constructor(port: number) {
    this.messageParsers["wpp"] = new WppMessageParser() //TODO later -change to annotation and automatic implementation (same as messageRouter)
    this.port = port
    this.setupBodyParser()
    this.setupRoutes()
  }

  public startServer(): void {
    this.app.listen(this.port, (err: any) => {
      if (err) {
        throw err
      }
      console.log("WhatsappFactCheck app listening on port " + this.port)
    })
  }

  private setupBodyParser() {
    this.app.use(bodyParser.urlencoded({ extended: false }))
  }

  private setupRoutes() {
    this.app.get("/", (req: any, res: any) => {
      res.end("Whatsapp Fact Check Server...")
    })

    this.app.post("/wppMessage", async (req: any, res: any) => {
      console.log("Received wpp msg request")
      // console.log(req.body);

      const body = req.body.Body
      const userResponse = await this.messageRouter.processMessage(this.messageParsers["wpp"].parse(body))

      res.writeHead(200, { "Content-Type": "text/xml" })
      res.end(userResponse)
      console.log("Returned answer to user\n")
    })

    this.app.post("/statusCallback", (req: any, res: any) => {
      // console.log("Received status callback");
      res.status(200).end("ok")
    })
  }
}
