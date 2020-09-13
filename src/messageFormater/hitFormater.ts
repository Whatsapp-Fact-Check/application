import { MessageResponseFormater, RegisterResponseFormater } from "./messageFormatter"
import { MessageResponse } from "../messageResponse/messageResponse"
import { MessageResponseHit, HitResult } from "../messageResponse/messageResponseHit"

@RegisterResponseFormater
export class HitFormater implements MessageResponseFormater {
  type: string
  private newLine = "\n"
  private doubleLine = "\n\n"
  private bold = "*"

  constructor() {
    this.type = "Hit"
  }

  formatMessage(message: MessageResponse): string {
    const messageResponseHit = this.toMessageResponseHit(message)

    const formattedString =
      this.bold +
      "Checagem de Fake News" + this.bold + " ✅" +
      this.doubleLine +
      "Encontrei registro(s) sobre esse tema! A seguir separei os mais relevantes: " +
      this.doubleLine +
      messageResponseHit.hits.map((hit) => this.formatHit(hit)).join(this.doubleLine)
    //iterar por todos os hits e mostrar os dois mais relevantes

    return formattedString
  }

  private formatHit(hit: HitResult): string {
    this.removeSpaceFromEntries(hit)
    let formattedString =
      `Fato verificado: ${this.bold + hit.Checado}${this.bold + this.newLine}` +
      `Verificado por: ${this.bold + hit.Checado_por}${this.bold + this.newLine}`
    if (hit.Data !== "") {
      formattedString += `Data da verificação: ${this.bold + hit.Data}${this.bold + this.newLine}` + `Link: ${hit.Link}`
    } else {
      formattedString += `Link: ${hit.Link}`
    }

    return formattedString
  }

  private removeSpaceFromEntries(hit: HitResult) {
    if (hit.Checado.charAt(hit.Checado.length - 1) == " ") {
      hit.Checado = hit.Checado.slice(0, -1)
    }
    if (hit.Checado_por.charAt(hit.Checado_por.length - 1) == " ") {
      hit.Checado_por = hit.Checado_por.slice(0, -1)
    }
    if (hit.Data.charAt(hit.Data.length - 1) == " ") {
      hit.Data = hit.Data.slice(0, -1)
    }
    if (hit.Link.charAt(hit.Link.length - 1) == " ") {
      hit.Link = hit.Link.slice(0, -1)
    }
  }

  private toMessageResponseHit(message: MessageResponse): MessageResponseHit {
    return message as MessageResponseHit
  }
}
