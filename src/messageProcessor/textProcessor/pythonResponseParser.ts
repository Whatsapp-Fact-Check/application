import { MessageResponse } from "../../messageResponse/messageResponse"
import { MessageResponseHit, HitResult } from "../../messageResponse/messageResponseHit"
import { MessageResponseNoHit } from "../../messageResponse/messageResponseNoHIt"

export class PythonResponseParser {
  parseMessage(pythonStringResponse: string): MessageResponse {
    const hits: Array<HitResult> = JSON.parse(pythonStringResponse)
    const messageResponseNoHit: MessageResponseNoHit = {
      type: "NoHit"
    }

    const messageResponseHit: MessageResponseHit = {
      type: "Hit",
      hits: hits
    }

    if (hits.length === 0) {
      //significa que n houve hit
      return messageResponseNoHit as MessageResponse
    } else {
      //significa q houve hits
      return messageResponseHit as MessageResponse
    }
  }
}
