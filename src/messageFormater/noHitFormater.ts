import { MessageResponse } from "../messageResponse/messageResponse"
import { MessageResponseFormater, RegisterResponseFormater } from "."
import { MessageResponseNoHit } from "@/messageResponse/messageResponseNoHit"

@RegisterResponseFormater
export class NoHitFormater implements MessageResponseFormater {
  type: string

  constructor() {
    this.type = "NoHit"
  }

  formatMessage(message: MessageResponse): string {
    const messageResponseNoHit = this.toMessageResponseNoHit(message)
    return (
      "Não encontramos nada correspondente 😓\n\n" +
      "Tente mandar de novo mudando um pouco a frase, usando sinônimos... Pode ser que isso ajude a gente a encontrar!" +
      " Lembre-se de sempre mandar textos curtos com as palavras chave do assunto que quer checar."
    )
  }

  private toMessageResponseNoHit(message: MessageResponse): MessageResponseNoHit {
    return message as MessageResponseNoHit
  }
}
