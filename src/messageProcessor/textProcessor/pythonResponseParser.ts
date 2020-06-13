import { MessageResponse } from "../../messageResponse/messageResponse"
import { MessageResponseHit, HitResult } from "../../messageResponse/messageResponseHit"
import { MessageResponseNoHit } from "../../messageResponse/messageResponseNoHIt"
import { MessageResponseError } from "../../messageResponse/messageResponseError"

export class PythonResponseParser {
  parseMessage(pythonStringResponse: string): MessageResponse {
    let hits: Array<HitResult>
    let messageResponseError: MessageResponseError

    if (this.isString(pythonStringResponse)) {
      hits = JSON.parse(pythonStringResponse)
    } else {
      messageResponseError = this.createMessageResponseError(new Error("PythonResponseNotString"))
      return messageResponseError as MessageResponse
    }
    const messageResponseNoHit: MessageResponseNoHit = {
      type: "NoHit"
    }

    const messageResponseHit: MessageResponseHit = {
      type: "Hit",
      hits: hits
    }

    if (this.isArrayHitResult(hits)) {
      if (hits.length === 0) {
        //significa que n houve hit
        return messageResponseNoHit as MessageResponse
      } else {
        //significa q houve hits
        return messageResponseHit as MessageResponse
      }
    } else {
      messageResponseError = this.createMessageResponseError(new Error("NotHitResultArray"))
      return messageResponseError as MessageResponse
    }
  }

  private createMessageResponseError(error: Error): MessageResponseError {
    const messageResponseError: MessageResponseError = {
      type: "Error",
      error: error
    }
    return messageResponseError
  }

  private isString(objeto: any): objeto is string {
    return typeof objeto === "string"
  }

  private isArrayHitResult(hits: any): hits is Array<HitResult> {
    if (hits instanceof Array) {
      for (let i = 0; i < hits.length; ++i) {
        if (!this.isHitResult(hits[i])) {
          return false
        }
      }
      return true
    }
    return false
  }

  private isHitResult(hitResult: any): hitResult is HitResult {
    if ("checado" in hitResult && "checado_por" in hitResult && "data" in hitResult && "link" in hitResult) {
      console.log("isHitResult" + hitResult)
      return true
    } else {
      return false
    }
  }
}
