import { MessageProcessorInterface, RegisterMessageProcessor } from "../messageProcessor"
import { MessageRequest } from "../..//messageRequest/messageRequest"
import { MessageResponse } from "../../messageResponse/messageResponse"
import { FakeNewsDatabaseParser } from "./fakeNewsDatabaseParser"
import HttpRequest from "../http/httpRequest"
import { MessageRequestText } from "../../messageRequest/messageRequestText"

export interface FakeNewsDataBaseRequest {
  text: string
}

@RegisterMessageProcessor
export class MessageTextProcessor implements MessageProcessorInterface {
  type: string
  private httpRequestClient: HttpRequest
  private pythonResponseParser: FakeNewsDatabaseParser
  private databaseUrl: string = "http://34.95.251.10"

  constructor() {
    this.type = "text"
    this.httpRequestClient = new HttpRequest()
    this.pythonResponseParser = new FakeNewsDatabaseParser()
  }

  async processMessage(message: MessageRequest): Promise<MessageResponse> {
    return new Promise<MessageResponse>(async (resolve, reject) => {
      const messageRequestText = this.toMessageRequestText(message)

      const data: FakeNewsDataBaseRequest = {
        text: messageRequestText.text
      }

      const httpResponse = await this.httpRequestClient.post(this.databaseUrl, data) //mudar 2 para variavel globar timeout
      resolve(this.pythonResponseParser.parseMessage(httpResponse))
    })
  }

  private toMessageRequestText(message: MessageRequest): MessageRequestText {
    return message as MessageRequestText
  }
}
