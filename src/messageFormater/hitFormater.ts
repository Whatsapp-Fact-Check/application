import { MessageResponseFormater, RegisterResponseFormater } from "./messageFormatter"
import { MessageResponse } from "../messageResponse/messageResponse"
import { MessageResponseHit, HitResult } from "../messageResponse/messageResponseHit"

@RegisterResponseFormater
export class HitFormater implements MessageResponseFormater {
  type: string
  private newLine = "\n"

  constructor() {
    this.type = "Hit"
  }

  formatMessage(message: MessageResponse): string {
    const messageResponseHit = this.toMessageResponseHit(message)

    const formattedString =
      "Encontrei " +
      messageResponseHit.hits.length +
      " registro(s) sobre esse tema! A seguir separei os mais relevantes: " +
      this.newLine +
      messageResponseHit.hits.map((hit) => this.formatHit(hit)).join(this.newLine)
    //iterar por todos os hits e mostrar os dois mais relevantes

    return formattedString
  }

  private formatHit(hit: HitResult): string {
    const formattedString = `Fato verificado: ${hit.checado}${this.newLine}Verificado por ${hit.checado_por}${this.newLine}Link: ${hit.link} `
    return formattedString
  }

  private toMessageResponseHit(message: MessageResponse): MessageResponseHit {
    return message as MessageResponseHit
  }
}
