import { MessageResponse } from "../../../messageResponse/messageResponse"
import { MessageResponseHit, HitResult } from "../../../messageResponse/messageResponseHit"
import { MessageResponseNoHit } from "../../../messageResponse/messageResponseNoHIt"
import { HttpError } from "../../http/httpRequest"
import { HttpParser } from '../../http/httpParser'

export class FakeNewsDatabaseParser extends HttpParser{
  parseMessage(response: string | HttpError): MessageResponse {
    if (this.isHttpError(response)) {
      const messageResponseError = this.createMessageResponseErrorInternal(response.error)
      return messageResponseError
    }

    if (!this.isJson(response)) {
      const messageResponseError = this.createMessageResponseErrorInternal("NotJsonStructure")
      return messageResponseError
    }

    if (this.isFactCheckResult(response)) {
      return this.getMessageResponse(response)
    } else {
      const messageResponseError = this.createMessageResponseErrorInternal("UnknownTypePythonResponse")
      return messageResponseError
    }
  }

  private getMessageResponse(response: string): MessageResponse {

    let hits = this.parseFactChecks(response)

    if (hits.length === 0) {
      //significa que n houve hit
      const messageResponseNoHit: MessageResponseNoHit = {
        type: "NoHit"
      }
      return messageResponseNoHit 
    } 
    else {
      //significa q houve hits
      hits = hits.slice(0, Math.min(hits.length, 3))
      const messageResponseHit: MessageResponseHit = {
        type: "Hit",
        hits: hits
      }
      return messageResponseHit
    }
  }

  private parseFactChecks(response: string) : HitResult[]{
    let parsed = JSON.parse(response)
    let hits: HitResult[] = new Array<HitResult>()

    for (let i = 0; i < parsed.length; ++i) {
      const elem = parsed[i]
      hits.push({
        Checado_por: elem.Agencia,
        Checado: elem.Titulo,
        Data: elem.Data,
        Link: elem.Link
      })
    }

    return hits
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
    return ("Agencia" in response && "Data" in response && "Link" in response && "Titulo" in response) 
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
