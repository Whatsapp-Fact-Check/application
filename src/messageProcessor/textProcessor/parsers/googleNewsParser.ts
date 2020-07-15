import { MessageResponse } from "@/messageResponse/messageResponse"
import { HttpError } from "../../http/httpRequest"
import { HttpParser } from "../../http/httpParser"
import { MessageResponseNoHit, News } from "@/messageResponse/messageResponseNoHIt"
const parseString = require("xml2js").parseString

export class GoogleNewsParser extends HttpParser {
  constructor() {
    super()
  }

  async parseMessage(response: string | HttpError): Promise<MessageResponse> {
    if (this.isHttpError(response)) {
      const messageResponseError = this.createMessageResponseErrorInternal(response.error)
      return messageResponseError
    }
    const messageResponse = await this.getMessageResponse(response)
    return messageResponse
  }

  private async getMessageResponse(response: string): Promise<MessageResponse> {
    const messageResponseNoHit: MessageResponseNoHit = {
      type: "NoHit"
    }
    try {
      const news = await this.parseXml(response)
      if (news.length !== 0) {
        messageResponseNoHit.relatedNews = news
      }
      return messageResponseNoHit
    } catch (errorMessage) {
      const messageResponseError = this.createMessageResponseErrorInternal(errorMessage)
      return messageResponseError
    }
  }

  private parseXml(response: string): Promise<News[]> {
    return new Promise((resolve, reject) => {
      const parsedJson = JSON.parse(response) //parse json because httpRequest stringify the http body as json
      parseString(parsedJson, (err: any, result: any) => {
        if (err) {
          reject("Google News Xml Parser: " + err)
        }

        const parsedItems = result.rss.channel[0].item
        const news: News[] = this.parseNews(parsedItems)
        resolve(news)
      })
    })
  }

  private parseNews(parsedItems: any): Array<News> {
    let news: News[] = new Array<News>()

    if (parsedItems == undefined){
      return news
    }

    const numNews = Math.min(parsedItems.length, 3)
    for (let index = 0; index < numNews; index++) {
      const element = parsedItems[index]
      let title = element.title[0]
      const link = element.link[0]
      let date = element.pubDate[0]
      const source = element.source[0]._
      title = this.removeSourceFromTitle(title, source)
      date = this.getFormatedDate(date)

      news.push({
        Title: title,
        Link: link,
        Date: date,
        Source: source
      })
    }
    
    return news
  }

  private removeSourceFromTitle(title: string, source: string) {
    const truncateIndex = title.lastIndexOf(source) - 3 //subtract 3 to delete the '-' char
    if (truncateIndex >= 0) {
      return title.substring(0, truncateIndex)
    }
    return title
  }

  private getFormatedDate(date: string) {
    const words = date.split(" ")
    return words[1] + " " + this.getPortugueseDate(words[2]) + " " + words[3]
  }

  private getPortugueseDate(date: string): string {
    const dateTranslationMap = this.setDateTranslationMap()
    return dateTranslationMap.get(date) as string
  }

  private setDateTranslationMap(): Map<string, string> {
    const dateTranslationMap = new Map()
    dateTranslationMap.set("Jan", "Janeiro")
    dateTranslationMap.set("Feb", "Fevereiro")
    dateTranslationMap.set("Mar", "Março")
    dateTranslationMap.set("Apr", "Abril")
    dateTranslationMap.set("May", "Maio")
    dateTranslationMap.set("Jun", "Junho")
    dateTranslationMap.set("Jul", "Julho")
    dateTranslationMap.set("Aug", "Agosto")
    dateTranslationMap.set("Sep", "Setembro")
    dateTranslationMap.set("Oct", "Outubro")
    dateTranslationMap.set("Nov", "Novembro")
    dateTranslationMap.set("Dec", "Dezembro")
    return dateTranslationMap
  }
}
