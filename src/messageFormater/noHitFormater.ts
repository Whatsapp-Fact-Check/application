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
        "Notícias Relacionadas" + this.bold + " 🔎" +
        this.doubleLine +
        "Infelizmente não conseguimos encontrar nenhuma checagem de fake news sobre o tema. Que tal você mesmo investigar? Clique no link" +
        " para acessar um passo a passo que te ajudará a identificar uma notícia falsa: http://bit.ly/ChequeVoceMesmo" +
        this.doubleLine +
        "Também buscamos algumas notícias na internet relacionadas ao assunto que você pesquisou 👇" +
        this.doubleLine
        
      formattedNews = messageResponseNoHit.relatedNews?.map((news) => this.formatNews(news)).join(this.doubleLine)
      formattedString += formattedNews
      return formattedString
      
    } else {
      return (
        "Não encontramos nada correspondente 😓\n\n" +
        "Tente mandar de novo mudando um pouco a frase, usando sinônimos... Pode ser que isso ajude a gente a encontrar!" + 
        " Lembre-se de sempre mandar textos curtos com as palavras chave do assunto que quer checar."
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
