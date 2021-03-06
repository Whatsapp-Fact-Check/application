import { MessageResponse } from "@/messageResponse/messageResponse"
import { HttpError } from "../../http/httpRequest"
import { HttpParser } from "../../http/httpParser"
import { MessageResponseNoHit, News } from "@/messageResponse/messageResponseNoHIt"
const parseString = require("xml2js").parseString

export class GoogleNewsParser extends HttpParser {

  private dateTranslationMap: Map<string, string> = new Map()

  constructor() {
    super()
    this.dateTranslationMap.set("Jan", "Janeiro")
    this.dateTranslationMap.set("Feb", "Fevereiro")
    this.dateTranslationMap.set("Mar", "Março")
    this.dateTranslationMap.set("Apr", "Abril")
    this.dateTranslationMap.set("May", "Maio")
    this.dateTranslationMap.set("Jun", "Junho")
    this.dateTranslationMap.set("Jul", "Julho")
    this.dateTranslationMap.set("Aug", "Agosto")
    this.dateTranslationMap.set("Sep", "Setembro")
    this.dateTranslationMap.set("Oct", "Outubro")
    this.dateTranslationMap.set("Nov", "Novembro")
    this.dateTranslationMap.set("Dec", "Dezembro")
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

    if (parsedItems == undefined) {
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
    return this.dateTranslationMap.get(date) as string
  }
}
