import HttpRequest from "../../../messageProcessor/http/httpRequest"
import { FakeNewsDatabaseParser } from "../parsers/fakeNewsDatabaseParser"
import { GoogleFactCheckParser } from "../parsers/googleFactCheckParser"
import { MessageResponse } from "@/messageResponse/messageResponse"
import { HitResult, MessageResponseHit } from "@/messageResponse/messageResponseHit"
import { MessageResponseNoHit } from "@/messageResponse/messageResponseNoHIt"

export class FactCheckSearcher {
  private databaseUrl = "http://34.94.124.1:8080/checagem"
  private googleFactCheckLanguageCode = "languageCode=pt-BR"
  private googleFactCheckUrl = "https://factchecktools.googleapis.com/v1alpha1/claims:search?"
  private httpRequestClient: HttpRequest
  private fakeNewsDatabaseParser: FakeNewsDatabaseParser
  private googleFactCheckParser: GoogleFactCheckParser

  constructor() {
    this.httpRequestClient = new HttpRequest()
    this.fakeNewsDatabaseParser = new FakeNewsDatabaseParser()
    this.googleFactCheckParser = new GoogleFactCheckParser()
  }

  public async searchFactChecks(text: string): Promise<MessageResponse> {
    let messageResponseDatabase, messageResponseGoogle: MessageResponse

    messageResponseDatabase = await this.searchFakeNewsDatabase(text)
    if (this.isMessageResponseError(messageResponseDatabase)) {
      return messageResponseDatabase
    }

    messageResponseGoogle = await this.searchGoogleFactCheck(text)
    if (this.isMessageResponseError(messageResponseGoogle)) {
      return messageResponseGoogle
    }

    return this.concatenateResults(messageResponseDatabase, messageResponseGoogle)
  }

  private async searchGoogleFactCheck(text: string): Promise<MessageResponse> {
    const url: string =
      this.googleFactCheckUrl +
      this.googleFactCheckLanguageCode +
      "&query=" +
      text +
      "&key=" +
      process.env.google_apiKey

    const httpResponse = await this.httpRequestClient.get(url)
    return this.googleFactCheckParser.parseMessage(httpResponse)
  }

  private async searchFakeNewsDatabase(text: string): Promise<MessageResponse> {
    const data = {
      text: text
    }

    const httpResponse = await this.httpRequestClient.post(this.databaseUrl, data)
    return this.fakeNewsDatabaseParser.parseMessage(httpResponse)
  }

  private concatenateResults(
    databaseResponse: MessageResponseHit | MessageResponseNoHit,
    googleResponse: MessageResponseHit | MessageResponseNoHit
  ): MessageResponseHit | MessageResponseNoHit {
    if (this.isMessageResponseNoHit(databaseResponse) && this.isMessageResponseNoHit(googleResponse)) {
      return googleResponse
    } else if (!this.isMessageResponseNoHit(databaseResponse) && this.isMessageResponseNoHit(googleResponse)) {
      return databaseResponse
    } else if (this.isMessageResponseNoHit(databaseResponse) && !this.isMessageResponseNoHit(googleResponse)) {
      return googleResponse
    } else {
      //both are MessageResponseHit
      let databaseResponseCopy = databaseResponse as MessageResponseHit
      let googleResponseCopy = googleResponse as MessageResponseHit

      //add first factcheck of database response in the google response
      let firstDatabaseFactCheck: HitResult = (databaseResponseCopy.hits)[0]
      googleResponseCopy.hits.unshift(firstDatabaseFactCheck)
      googleResponseCopy.hits = googleResponseCopy.hits.slice(0, Math.min(googleResponseCopy.hits.length, 3))
      return googleResponseCopy
    }
  }

  private isMessageResponseNoHit(messageResponse: MessageResponse): boolean {
    return messageResponse.type == "NoHit"
  }

  private isMessageResponseError(messageResponse: MessageResponse): boolean {
    return messageResponse.type == "Error"
  }
}
