import { MessageProcessorInterface, RegisterMessageProcessor } from "../messageProcessor"
import { MessageRequest } from "../..//messageRequest/messageRequest"
import { MessageResponse } from "../../messageResponse/messageResponse"
import { FakeNewsDatabaseParser } from "./parsers/fakeNewsDatabaseParser"
import HttpRequest from "../http/httpRequest"
import { MessageRequestText } from "../../messageRequest/messageRequestText"
import { GoogleNewsParser } from "./parsers/googleNewsParser"

export interface FakeNewsDataBaseRequest {
  text: string
}

@RegisterMessageProcessor
export class MessageTextProcessor implements MessageProcessorInterface {
  type: string

  private httpRequestClient: HttpRequest
  private pythonResponseParser: FakeNewsDatabaseParser
  private googleNewsParser: GoogleNewsParser

  private databaseUrl = "http://34.95.251.10:8080/checagem"
  private googleNewsUrl = "https://news.google.com/rss/search?q="
  private googleNewsLanguage = "&hl=pt-BR"
  private googleFactCheckLanguageCode = "pt-BR"
  private googleFactCheckUrl =
    "https://factchecktools.googleapis.com/v1alpha1/claims:search?languageCode=" +
    this.googleFactCheckLanguageCode +
    "&query="

  constructor() {
    this.type = "text"
    this.httpRequestClient = new HttpRequest()
    this.pythonResponseParser = new FakeNewsDatabaseParser()
    this.googleNewsParser = new GoogleNewsParser()
  }

  async processMessage(message: MessageRequest): Promise<MessageResponse> {
    return new Promise<MessageResponse>(async (resolve, reject) => {
      const messageRequestText = this.toMessageRequestText(message)

      let messageResponse = await this.searchGoogleFactCheck(messageRequestText)
      if (this.isMessageResponseNoHit(messageResponse)) {
        messageResponse = await this.searchGoogleNews(messageRequestText)
      }

      resolve(messageResponse)
    })
  }

  private async searchGoogleFactCheck(messageRequestText: MessageRequestText): Promise<MessageResponse> {
    const url: string = this.googleFactCheckUrl + messageRequestText.text + "&key=" + process.env.GOOGLE_API_KEY

    const httpResponse = await this.httpRequestClient.get(url)
    console.log("GOOGLE RESPONSE0" + httpResponse)
    return this.pythonResponseParser.parseMessage(httpResponse) //mudar para googleFactCheckParser
  }

  private async searchFakeNewsDatabase(messageRequestText: MessageRequestText): Promise<MessageResponse> {
    const data: FakeNewsDataBaseRequest = {
      text: messageRequestText.text
    }

    const httpResponse = await this.httpRequestClient.post(this.databaseUrl, data)
    return this.pythonResponseParser.parseMessage(httpResponse)
  }

  private async searchGoogleNews(messageRequestText: MessageRequestText): Promise<MessageResponse> {
    const url: string = this.googleNewsUrl + messageRequestText.text + this.googleNewsLanguage
    const httpResponse = await this.httpRequestClient.get(url)
    const parsedMessage = await this.googleNewsParser.parseMessage(httpResponse)
    return parsedMessage
  }

  private isMessageResponseNoHit(messageResponse: MessageResponse): boolean {
    return messageResponse.type == "NoHit"
  }

  private toMessageRequestText(message: MessageRequest): MessageRequestText {
    return message as MessageRequestText
  }
}
