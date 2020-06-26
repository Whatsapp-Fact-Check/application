import { MessageResponse } from "../../messageResponse/messageResponse"
import { MessageResponseHit, HitResult } from "../../messageResponse/messageResponseHit"
import { MessageResponseNoHit } from "../../messageResponse/messageResponseNoHIt"
import { HttpError } from "../http/httpRequest"
import { MessageResponseErrorInternal } from '@/messageResponse/messageResponseError'

export class FakeNewsDatabaseParser {
  parseMessage(response: string | HttpError): MessageResponse {
    if (this.isHttpError(response)) {
      const messageResponseError = this.createMessageResponseErrorInternal(response.error)
      return messageResponseError
    }

    if (!this.isJson(response)) {
      const messageResponseError = this.createMessageResponseErrorInternal("NotJsonStructure")
      return messageResponseError
    }

    if (this.isArrayHitResult(response)) {
      return this.getMessageResponse(response)
    } else {
      const messageResponseError = this.createMessageResponseErrorInternal("UnknownTypePythonResponse")
      return messageResponseError
    }
  }

  private isJson(response: string): boolean {
    try {
      JSON.parse(response)
      return true
    } catch {
      return false
    }
  }

  private getMessageResponse(response: string): MessageResponse {
    const hits = JSON.parse(response)
    if (hits.length === 0) {
      //significa que n houve hit
      const messageResponseNoHit: MessageResponseNoHit = {
        type: "NoHit"
      }

      return messageResponseNoHit as MessageResponse
    } else {
      //significa q houve hits

      const messageResponseHit: MessageResponseHit = {
        type: "Hit",
        hits: hits
      }
      return messageResponseHit as MessageResponse
    }
  }

  private createMessageResponseErrorInternal(error: string): MessageResponseErrorInternal {
    const messageResponseError: MessageResponseErrorInternal = {
      type: "Error",
      errorInternal: {error: new Error(error)}
    }
    return messageResponseError
  }

  private isArrayHitResult(response: string): boolean {
    const parsed = JSON.parse(response)
    if (parsed instanceof Array) {
      for (let i = 0; i < parsed.length; ++i) {
        if (!this.isHitResult(parsed[i])) {
          return false
        }
      }
      return true
    }
    return false
  }

  private isHitResult(hitResult: any): hitResult is HitResult {
    if ("Checado" in hitResult && "Checado_por" in hitResult && "Data" in hitResult && "Link" in hitResult) {
      console.log("isHitResult" + hitResult)
      return true
    } else {
      return false
    }
  }

  private isHttpError(response: string | HttpError): response is HttpError {
    if (response !== undefined && (response as HttpError).error) {
      return true
    }
    return false
  }
}
