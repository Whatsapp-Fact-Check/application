import { RegisterMessageProcessor } from "../../messageRouter/messageRouter"
import { MessageProcessor } from "../messageProcessor"
import { MessageRequest } from "../..//messageRequest/messageRequest"
import { MessageResponse } from "../../messageResponse/messageResponse"
import { FakeNewsDatabaseParser } from "./fakeNewsDatabaseParser"
import HttpRequest from "../http/httpRequest"
import { MessageRequestText } from "../../messageRequest/messageRequestText"

export interface FakeNewsDataBaseRequest {
  text: string
}

@RegisterMessageProcessor
export class MessageTextProcessor implements MessageProcessor {
  type: string
  httpRequestClient: HttpRequest
  pythonResponseParser: FakeNewsDatabaseParser

  async processMessage(message: MessageRequest): Promise<MessageResponse> {
    return new Promise<MessageResponse>(async (resolve, reject) => {
      const messageRequestText = this.toMessageRequestText(message)

      const data: FakeNewsDataBaseRequest = {
        text: messageRequestText.text
      }

      const httpResponse = await this.httpRequestClient.post("https://dbsamuca.com", data) //mudar 2 para variavel globar timeout
      resolve(this.pythonResponseParser.parseMessage(httpResponse))
    })
  }
  constructor() {
    this.type = "text"
    this.httpRequestClient = new HttpRequest()
    this.pythonResponseParser = new FakeNewsDatabaseParser()
  }

  private toMessageRequestText(message: MessageRequest): MessageRequestText {
    return message as MessageRequestText
  }
}
