import { MessageResponse } from "../../../messageResponse/messageResponse"
import { MessageResponseNoHit, News } from "../../../messageResponse/messageResponseNoHIt"
import { HttpError } from "../../http/httpRequest"
import { HttpParser } from '../../http/httpParser'

export class RelatedNewsDatabaseParser extends HttpParser{
  parseMessage(response: string | HttpError): MessageResponse {
    if (this.isHttpError(response)) {
      const messageResponseError = this.createMessageResponseErrorInternal(response.error)
      return messageResponseError
    }

    if (!this.isJson(response)) {
      const messageResponseError = this.createMessageResponseErrorInternal("NotJsonStructure")
      return messageResponseError
    }

    if (this.isRelatedNewsResult(response)) {
      return this.getMessageResponse(response)
    } else {
      const messageResponseError = this.createMessageResponseErrorInternal("UnknownTypePythonResponse")
      return messageResponseError
    }
  }

  private getMessageResponse(response: string): MessageResponse {
    const messageResponseNoHit: MessageResponseNoHit = {
      type: "NoHit"
    }
    let news = this.parseRelatedNews(response)
    if (news.length !== 0) {
      news = news.slice(0, Math.min(news.length, 3))
      messageResponseNoHit.relatedNews = news
    }
    
    return messageResponseNoHit
  }

  private parseRelatedNews(response: string) : News[]{
    let parsed = JSON.parse(response)
    let news: News[] = new Array<News>()

    for (let i = 0; i < parsed.length; ++i) {
      const elem = parsed[i]
      news.push({
        Source: elem.Agencia,
        Title: elem.Titulo,
        Date: elem.Data,
        Link: elem.Link
      })
    }

    return news
  }

  private isRelatedNewsResult(response: string): boolean {
    const parsed = JSON.parse(response)
    if (parsed instanceof Array) {
      for (let i = 0; i < parsed.length; ++i) {
        if (!this.isRelatedNews(parsed[i])) {
          return false
        }
      }
      return true
    }
    return false
  }

  private isRelatedNews(response: any): boolean {
    return ("Agencia" in response && "Data" in response && "Link" in response && "Titulo" in response) 
  }

  private isJson(response: string): boolean {
    try {
      JSON.parse(response)
      return true
    } catch {
      return false
    }
  }
}
