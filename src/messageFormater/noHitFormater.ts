import { MessageResponse } from "../messageResponse/messageResponse"
import { MessageResponseFormater, RegisterResponseFormater } from "."
import { MessageResponseNoHit, News } from "@/messageResponse/messageResponseNoHIt"

@RegisterResponseFormater
export class NoHitFormater implements MessageResponseFormater {
  type: string

  private newLine = "\n"
  private doubleLine = "\n\n"
  private bold = "*"

  constructor() {
    this.type = "NoHit"
  }

  formatMessage(message: MessageResponse): string {
    const messageResponseNoHit = this.toMessageResponseNoHit(message)
    let formattedNews
    if (this.hasRelatedNews(messageResponseNoHit)) {
      let formattedString =
        this.bold +
        "##Notícias Relacionadas##" +
        this.bold +
        this.doubleLine +
        "Infelizmente não conseguimos encontrar nenhuma checagem de fakeNews sobre o tema. Buscamos algumas notícias na internet relacionadas ao assunto que você pesquisou pra ver se ajuda. 👇 " +
        this.doubleLine
      if (messageResponseNoHit.relatedNews) {
        formattedNews = messageResponseNoHit.relatedNews.map((news) => this.formatNews(news)).join(this.doubleLine)
      } else {
        // deu merda no relatedNews
        return (
          "Não encontramos nada correspondente 😓\n\n" +
          "Tente mandar de novo mudando um pouco a frase, usando sinônimos... Pode ser que isso ajude a gente a encontrar!"
        )
      }

      formattedString += formattedNews
      return formattedString
    } else {
      return (
        "Não encontramos nada correspondente 😓\n\n" +
        "Tente mandar de novo mudando um pouco a frase, usando sinônimos... Pode ser que isso ajude a gente a encontrar!"
      )
    }
  }

  private hasRelatedNews(message: MessageResponseNoHit): boolean {
    return "relatedNews" in message
  }

  private formatNews(news: News): string {
    const formattedString =
      `Notícia: ${this.bold + news.Title}${this.bold + this.newLine}` +
      `Fonte: ${this.bold + news.Source}${this.bold + this.newLine}` +
      `Data da notícia: ${this.bold + news.Date}${this.bold + this.newLine}` +
      `Link: ${news.Link}`

    return formattedString
  }

  private toMessageResponseNoHit(message: MessageResponse): MessageResponseNoHit {
    return message as MessageResponseNoHit
  }
}
