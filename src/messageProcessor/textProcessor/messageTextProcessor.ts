import { MessageProcessorInterface, RegisterMessageProcessor } from "../messageProcessor"
import { MessageRequest } from "../..//messageRequest/messageRequest"
import { MessageResponse } from "../../messageResponse/messageResponse"
import { FakeNewsDatabaseParser } from "./parsers/fakeNewsDatabaseParser"
import HttpRequest from "../http/httpRequest"
import { MessageRequestText } from "../../messageRequest/messageRequestText"
import { GoogleNewsParser } from "./parsers/googleNewsParser"
import { GoogleFactCheckParser } from "./parsers/googleFactCheckParser"

export interface FakeNewsDataBaseRequest {
  text: string
}

@RegisterMessageProcessor
export class MessageTextProcessor implements MessageProcessorInterface {
  type: string

  private httpRequestClient: HttpRequest
  private pythonResponseParser: FakeNewsDatabaseParser
  private googleNewsParser: GoogleNewsParser
  private googleFactCheckParser: GoogleFactCheckParser

  private databaseUrl = "http://34.95.251.10:8080/checagem"
  private googleNewsUrl = "https://news.google.com/rss/search?q="
  private googleNewsLanguage = "&hl=pt-BR"
  private googleFactCheckLanguageCode = "languageCode=pt-BR"
  private googleFactCheckUrl = "https://factchecktools.googleapis.com/v1alpha1/claims:search?"

  constructor() {
    this.type = "text"
    this.httpRequestClient = new HttpRequest()
    this.pythonResponseParser = new FakeNewsDatabaseParser()
    this.googleNewsParser = new GoogleNewsParser()
    this.googleFactCheckParser = new GoogleFactCheckParser()
  }

  processMessage(message: MessageRequest): Promise<MessageResponse> {
    return new Promise<MessageResponse>(async (resolve, reject) => {
      const messageRequestText = this.toMessageRequestText(message)

      try {
        let messageResponse = await this.searchGoogleFactCheck(messageRequestText)
        if (this.isMessageResponseNoHit(messageResponse)) {
          messageResponse = await this.searchGoogleNews(messageRequestText)
        }
        resolve(messageResponse)
      } catch (error) {
        reject(error)
      }
      
    })
  }

  private async searchGoogleFactCheck(messageRequestText: MessageRequestText): Promise<MessageResponse> {
    const url: string =
      this.googleFactCheckUrl +
      this.googleFactCheckLanguageCode +
      "&query=" +
      messageRequestText.text +
      "&key=" +
      process.env.google_apiKey

    const httpResponse = await this.httpRequestClient.get(url)
    return this.googleFactCheckParser.parseMessage(httpResponse)
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
