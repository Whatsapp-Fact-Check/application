import { MessageResponse } from "../../../messageResponse/messageResponse"
import { MessageResponseNoHit } from "../../../messageResponse/messageResponseNoHit"
import { HttpParser } from '../../http/httpParser'
import { MessageResponseRelatedNews, News } from '@/messageResponse/messageResponsRelatedNews'
import { httpResponseOrError } from '@/messageProcessor/http/httpRequest'

export class RelatedNewsDatabaseParser extends HttpParser{
  parseMessage(response: httpResponseOrError): MessageResponse {
    if (this.isHttpError(response)) {
      const messageResponseError = this.createMessageResponseErrorInternal(response.error)
      return messageResponseError
    }

    if (!this.isJson(response)) {
      const messageResponseError = this.createMessageResponseErrorInternal(new Error("NotJsonStructure"))
      return messageResponseError
    }

    if (this.isRelatedNewsResult(response)) {
      return this.getMessageResponse(response)
    } else {
      const messageResponseError = this.createMessageResponseErrorInternal(new Error("UnknownTypePythonResponse"))
      return messageResponseError
    }
  }

  private getMessageResponse(response: string): MessageResponse {

    let news = this.parseRelatedNews(response)
    if (news.length !== 0) {
      news = news.slice(0, Math.min(news.length, 3))
      const messageResponse: MessageResponseRelatedNews = {
        type: "RelatedNews",
        relatedNews: news
      }
      return messageResponse
    }
    
    const messageResponse: MessageResponseNoHit = {
      type: "NoHit"
    }
    return messageResponse
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
