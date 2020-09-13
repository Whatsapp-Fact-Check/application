import HttpRequest from "../../../messageProcessor/http/httpRequest"
import { RelatedNewsDatabaseParser } from "../parsers/relatedNewsDatabaseParser"
import { GoogleNewsParser } from "../parsers/googleNewsParser"
import { MessageResponse } from "@/messageResponse/messageResponse"
import { MessageResponseNoHit, News } from "@/messageResponse/messageResponseNoHIt"

export class RelatedNewsSearcher {
  private databaseUrl = "http://34.94.124.1:8080/noticia"
  private googleNewsUrl = "https://news.google.com/rss/search?q="
  private googleNewsLanguage = "&hl=pt-BR"
  private httpRequestClient: HttpRequest
  private relatedNewsDatabaseParser: RelatedNewsDatabaseParser
  private googleNewsParser: GoogleNewsParser

  constructor() {
    this.httpRequestClient = new HttpRequest()
    this.relatedNewsDatabaseParser = new RelatedNewsDatabaseParser()
    this.googleNewsParser = new GoogleNewsParser()
  }

  public async searchRelatedNews(text: string): Promise<MessageResponse> {
    let messageResponseDatabase, messageResponseGoogle: MessageResponse

    // messageResponseDatabase = await this.searchRelatedNewsDatabase(text)
    // if (this.isMessageResponseError(messageResponseDatabase)) {
    //   return messageResponseDatabase
    // }

    messageResponseGoogle = await this.searchGoogleNews(text)
    if (this.isMessageResponseError(messageResponseGoogle)) {
      return messageResponseGoogle
    }

    return messageResponseGoogle
    // return this.concatenateResults(messageResponseDatabase, messageResponseGoogle)
  }

  private async searchRelatedNewsDatabase(text: string): Promise<MessageResponse> {
    const data = {
      text: text
    }

    const httpResponse = await this.httpRequestClient.post(this.databaseUrl, data)
    return this.relatedNewsDatabaseParser.parseMessage(httpResponse)
  }

  private async searchGoogleNews(text: string): Promise<MessageResponse> {
    const url: string = this.googleNewsUrl + text + this.googleNewsLanguage
    const httpResponse = await this.httpRequestClient.get(url)
    const parsedMessage = await this.googleNewsParser.parseMessage(httpResponse)
    return parsedMessage
  }

  private concatenateResults(
    databaseResponse: MessageResponseNoHit,
    googleResponse: MessageResponseNoHit
  ): MessageResponseNoHit {
    if ("relatedNews" in databaseResponse && !("relatedNews" in googleResponse)) {
      return databaseResponse
    } else if (!("relatedNews" in databaseResponse) && "relatedNews" in googleResponse) {
      return googleResponse
    } else {
      let firstDatabaseNews: News = (databaseResponse.relatedNews as News[])[0]
      googleResponse.relatedNews?.unshift(firstDatabaseNews)
      googleResponse.relatedNews = googleResponse.relatedNews?.slice(0, Math.min(googleResponse.relatedNews?.length, 3))
      return googleResponse
    }
  }

  private isMessageResponseNoHit(messageResponse: MessageResponse): boolean {
    return messageResponse.type == "NoHit"
  }

  private isMessageResponseError(messageResponse: MessageResponse): boolean {
    return messageResponse.type == "Error"
  }
}
