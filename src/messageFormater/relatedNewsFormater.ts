import { MessageResponse } from "../messageResponse/messageResponse"
import { MessageResponseFormater, RegisterResponseFormater } from "."
import { News, MessageResponseRelatedNews } from '@/messageResponse/messageResponsRelatedNews'

@RegisterResponseFormater
export class RelatedNewsFormater implements MessageResponseFormater {
  type: string

  private newLine = "\n"
  private doubleLine = "\n\n"
  private bold = "*"

  constructor() {
    this.type = "RelatedNews"
  }

  formatMessage(message: MessageResponse): string {
    const messageResponse = this.toMessageResponseRelatedNews(message)
    let formattedNews
    let formattedString =
      this.bold +
      "Notícias Relacionadas" +
      this.bold +
      " 🔎" +
      this.doubleLine +
      "Infelizmente não conseguimos encontrar nenhuma checagem de fake news sobre o tema. Que tal você mesmo investigar? Clique no link" +
      " para acessar um passo a passo que te ajudará a identificar uma notícia falsa: http://bit.ly/ChequeVoceMesmo" +
      this.doubleLine +
      "Também buscamos algumas notícias na internet relacionadas ao assunto que você pesquisou 👇" +
      this.doubleLine

    formattedNews = messageResponse.relatedNews.map((news) => this.formatNews(news)).join(this.doubleLine)
    formattedString += formattedNews
    return formattedString
  }

  private formatNews(news: News): string {
    const formattedString =
      `Notícia: ${this.bold + news.Title}${this.bold + this.newLine}` +
      `Fonte: ${this.bold + news.Source}${this.bold + this.newLine}` +
      `Data da notícia: ${this.bold + news.Date}${this.bold + this.newLine}` +
      `Link: ${news.Link}`

    return formattedString
  }

  private toMessageResponseRelatedNews(message: MessageResponse): MessageResponseRelatedNews {
    return message as MessageResponseRelatedNews
  }
}
