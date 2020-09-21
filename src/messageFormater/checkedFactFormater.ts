import { MessageResponseFormater, RegisterResponseFormater } from "./messageFormatter"
import { MessageResponse } from "../messageResponse/messageResponse"
import { MessageResponseCheckedFacts, CheckedFact } from "../messageResponse/MessageResponseCheckedFacts"

@RegisterResponseFormater
export class CheckedFactFormater implements MessageResponseFormater {
  type: string
  private newLine = "\n"
  private doubleLine = "\n\n"
  private bold = "*"

  constructor() {
    this.type = "CheckedFact"
  }

  formatMessage(message: MessageResponse): string {
    const messageResponseCheckedFact = this.toMessageResponseCheckedFact(message)

    const formattedString =
      this.bold +
      "Checagem de Fake News" + this.bold + " ✅" +
      this.doubleLine +
      "Encontrei registro(s) sobre esse tema! A seguir separei os mais relevantes: " +
      this.doubleLine +
      messageResponseCheckedFact.checkedFacts.map((checkedFact) => this.formatCheckedFact(checkedFact)).join(this.doubleLine)

    return formattedString
  }

  private formatCheckedFact(checkedFact: CheckedFact): string {
    this.removeSpaceFromEntries(checkedFact)
    let formattedString =
      `Fato verificado: ${this.bold + checkedFact.Checado}${this.bold + this.newLine}` +
      `Verificado por: ${this.bold + checkedFact.Checado_por}${this.bold + this.newLine}`
    if (checkedFact.Data !== "") {
      formattedString += `Data da verificação: ${this.bold + checkedFact.Data}${this.bold + this.newLine}` + `Link: ${checkedFact.Link}`
    } else {
      formattedString += `Link: ${checkedFact.Link}`
    }

    return formattedString
  }

  private removeSpaceFromEntries(checkedFact: CheckedFact) {
    if (checkedFact.Checado.charAt(checkedFact.Checado.length - 1) == " ") {
      checkedFact.Checado = checkedFact.Checado.slice(0, -1)
    }
    if (checkedFact.Checado_por.charAt(checkedFact.Checado_por.length - 1) == " ") {
      checkedFact.Checado_por = checkedFact.Checado_por.slice(0, -1)
    }
    if (checkedFact.Data.charAt(checkedFact.Data.length - 1) == " ") {
      checkedFact.Data = checkedFact.Data.slice(0, -1)
    }
    if (checkedFact.Link.charAt(checkedFact.Link.length - 1) == " ") {
      checkedFact.Link = checkedFact.Link.slice(0, -1)
    }
  }

  private toMessageResponseCheckedFact(message: MessageResponse): MessageResponseCheckedFacts {
    return message as MessageResponseCheckedFacts
  }
}
