import { MessageResponse } from "../messageResponse/messageResponse"
import { MessageResponseFormater, RegisterResponseFormater } from "."

@RegisterResponseFormater
export class NoHitFormater implements MessageResponseFormater {
  type: string

  constructor() {
    this.type = "NoHit"
  }

  formatMessage(message: MessageResponse): string {
    return "Infelizmente não conseguimos localizar nenhuma checagem relacionada com a frase enviada. "
  }
}
