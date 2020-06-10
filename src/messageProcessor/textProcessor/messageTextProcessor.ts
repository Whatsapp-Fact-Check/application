import { RegisterMessageProcessor } from "../../messageRouter/messageRouter"
import { MessageProcessor } from "../messageProcessor"
import { MessageRequest } from "../..//messageRequest/messageRequest"
import { MessageResponse } from "../../messageResponse/messageResponse"
import { PythonResponseParser } from "../textProcessor/pythonResponseParser"
import HttpRequest, { PythonRequest } from "../http/httpRequest"

@RegisterMessageProcessor
export class MessageTextProcessor implements MessageProcessor {
  type: string
  httpRequestClient: HttpRequest
  pythonResponseParser: PythonResponseParser

  async processMessage(message: MessageRequest): Promise<MessageResponse> {
    return new Promise<MessageResponse>(async (resolve, reject) => {
      const data: PythonRequest = {
        text: message.text
      }

      const httpResponse = await this.httpRequestClient.post("https://dbsamuca.com", data)
      resolve(this.pythonResponseParser.parseMessage(httpResponse))
    })
  }
  constructor() {
    this.type = "text"
    this.httpRequestClient = new HttpRequest()
    this.pythonResponseParser = new PythonResponseParser()
  }
}
