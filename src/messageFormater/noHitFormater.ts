import { MessageResponse } from "../messageResponse/messageResponse"
import { MessageResponseFormater, RegisterResponseFormater } from "."

@RegisterResponseFormater
export class NoHitFormater implements MessageResponseFormater {
  type: string

  constructor() {
    this.type = "NoHit"
  }

  formatMessage(message: MessageResponse): string {
    return "Não encontramos nada correspondente 😓\n\n" +
    "Tente mandar de novo mudando um pouco a frase, usando sinônimos... Pode ser que isso ajude a gente a encontrar!"
  }
}
