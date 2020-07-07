import { MessageResponse } from "@/messageResponse/messageResponse"
import { HttpError } from "../http/httpRequest"
import { HttpParser } from "../http/httpParser"
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

    return await this.getMessageResponse(response)
  }

  private async getMessageResponse(response: string): Promise<MessageResponse> {
    let messageResponseNoHit: MessageResponseNoHit = {
      type: "NoHit"
    }
    try {
      const news = await this.parseXml(response)
      if (news.length === 0) {
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
      let parsedJson = JSON.parse(response) //parse json because httpRequest stringify the http body as json
      parseString(parsedJson, (err: any, result: any) => {
        if (err) {
          reject("Google News Xml Parser: " + err)
        }

        let news: News[] = new Array<News>()

        let parsedItems = result.rss.channel[0].item
        let numNews = 3

        for (let index = 0; index < numNews; index++) {
          const element = parsedItems[index]
          let title = element.title[0]
          let link = element.link[0]
          let date = element.pubDate[0]
          let source = element.source[0]._
          title = this.removeSourceFromTitle(title, source)
          date = this.getFormatedDate(date)

          news.push({
            Title: title,
            Link: link,
            Date: date,
            Source: source
          })
        }
        console.log(news)
        resolve(news)
      })
    })
  }

  private removeSourceFromTitle(title: string, source: string) {
    let truncateIndex = title.lastIndexOf(source) - 3 //subtract 3 to delete the '-' char
    if (truncateIndex >= 0) {
      return title.substring(0, truncateIndex)
    }
    return title
  }

  private getFormatedDate(date: string) {
    let words = date.split(" ")
    return words[1] + " " + words[2] + " " + words[3]
  }
}
