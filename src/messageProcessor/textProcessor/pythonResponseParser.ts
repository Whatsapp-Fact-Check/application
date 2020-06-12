import { MessageResponse } from "../../messageResponse/messageResponse"
import { MessageResponseHit, HitResult } from "../../messageResponse/messageResponseHit"
import { MessageResponseNoHit } from "../../messageResponse/messageResponseNoHIt"

export class PythonResponseParser {
  parseMessage(pythonStringResponse: string): MessageResponse {
    let hits: Array<HitResult>
    if (this.isString(pythonStringResponse)) {
      hits = JSON.parse(pythonStringResponse)
    } else {
      throw new Error("PythonResponseNotString")
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
      throw new Error("NotHitResultArray")
    }
  }

  private isString(objeto: any): objeto is string {
    return typeof objeto === "string"
  }

  private isArrayHitResult(hits: any): hits is Array<HitResult> {
    if (hits instanceof Array) {
      hits.forEach((element) => {
        if (!this.isHitResult(element)) {
          return false
        }
      })
      return true
    }
    return false
  }

  private isHitResult(hitResult: any): hitResult is HitResult {
    if ("checado" in hitResult && "checado_por" in hitResult && "data" in hitResult && "link" in hitResult) {
      return true
    } else {
      return false
    }
  }
}
