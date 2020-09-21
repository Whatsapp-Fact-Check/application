import express from "express"
import bodyParser from "body-parser"
import { MessageParser } from "./messageParser"
import { MessageRouter } from "./messageRouter/messageRouter"
import { TwilioFormater } from "./messageFormater/twilioFormater"

export class WebHookServer {
  private port: number
  private app: any = express()
  private messageRouter: MessageRouter = new MessageRouter()
  private messageParser: MessageParser = new MessageParser()
  private twilioFormater: TwilioFormater = new TwilioFormater()

  constructor(port: number) {
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
      const parserType = "wpp"
      let userResponse: string

      console.log("Received wpp msg request")

      try {
        userResponse = await this.messageRouter.processMessage(this.messageParser.parse(parserType, req.body))
        userResponse = this.twilioFormater.format(userResponse)
      } catch (error) {
        userResponse =
          "Encontramos um problema interno ao processar sua requisição, estamos trabalhando para corrigir 👨‍💻"
        userResponse = this.twilioFormater.format(userResponse)
        console.error(error)
      }

      res.writeHead(200, { "Content-Type": "text/xml" })
      res.end(userResponse)
      console.log("Returned answer to user: " + userResponse + "\n")
    })

    this.app.post("/statusCallback", (req: any, res: any) => {
      // console.log("Received status callback");
      res.status(200).end("ok")
    })

    this.app.post("/error", (req: any, res: any) => {
      console.log("Received error callback");
      console.log(req)
      res.status(200).end("ok")
    })
  }
}
