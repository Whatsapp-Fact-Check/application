import { httpResponseOrError } from "@/messageProcessor/http/httpRequest"
import { MessageResponse } from "../../../messageResponse/messageResponse"
import { MessageResponseCheckedFacts, CheckedFact } from "../../../messageResponse/MessageResponseCheckedFacts"
import { MessageResponseNoHit } from "../../../messageResponse/messageResponseNoHit"
import { HttpParser } from "../../http/httpParser"

export class FakeNewsDatabaseParser extends HttpParser {
  parseMessage(response: httpResponseOrError): MessageResponse {
    if (this.isHttpError(response)) {
      const messageResponseError = this.createMessageResponseErrorInternal(response.error)
      return messageResponseError
    }

    if (!this.isJson(response)) {
      const messageResponseError = this.createMessageResponseErrorInternal(new Error("NotJsonStructure"))
      return messageResponseError
    }

    if (this.isFactCheckResult(response)) {
      return this.getMessageResponse(response)
    } else {
      const messageResponseError = this.createMessageResponseErrorInternal(new Error("UnknownTypePythonResponse"))
      return messageResponseError
    }
  }

  private getMessageResponse(response: string): MessageResponse {
    let checkedFacts = this.parseFactChecks(response)

    if (checkedFacts.length === 0) {
      const messageResponseNoHit: MessageResponseNoHit = {
        type: "NoHit"
      }
      return messageResponseNoHit
    } else {
      checkedFacts = checkedFacts.slice(0, Math.min(checkedFacts.length, 3))
      const messageResponseCheckedFact: MessageResponseCheckedFacts = {
        type: "CheckedFact",
        checkedFacts: checkedFacts
      }
      return messageResponseCheckedFact
    }
  }

  private parseFactChecks(response: string): CheckedFact[] {
    let parsed = JSON.parse(response)
    let checkedFacts: CheckedFact[] = new Array<CheckedFact>()

    for (let i = 0; i < parsed.length; ++i) {
      const elem = parsed[i]
      checkedFacts.push({
        Checado_por: elem.Agencia,
        Checado: elem.Titulo,
        Data: elem.Data,
        Link: elem.Link
      })
    }

    return checkedFacts
  }

  private isFactCheckResult(response: string): boolean {
    const parsed = JSON.parse(response)
    if (parsed instanceof Array) {
      for (let i = 0; i < parsed.length; ++i) {
        if (!this.isFactCheck(parsed[i])) {
          return false
        }
      }
      return true
    }
    return false
  }

  private isFactCheck(response: any): boolean {
    return "Agencia" in response && "Data" in response && "Link" in response && "Titulo" in response
  }

  private isJson(response: string): boolean {
    try {
      JSON.parse(response)
      return true
    } catch {
      return false
    }
  }
}
