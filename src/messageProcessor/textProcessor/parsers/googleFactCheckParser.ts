import { HttpError } from "@/messageProcessor/http/httpRequest"
import { MessageResponse } from "@/messageResponse/messageResponse"
import { HttpParser } from "../../http/httpParser"
import { HitResult, MessageResponseHit } from "@/messageResponse/messageResponseHit"

export class GoogleFactCheckParser extends HttpParser {
  parseMessage(response: string | HttpError): MessageResponse {
    if (this.isHttpError(response)) {
      const messageResponseError = this.createMessageResponseErrorInternal(response.error)
      return messageResponseError
    }

    if (!this.isJson(response)) {
      const messageResponseError = this.createMessageResponseErrorInternal("NotJsonStructure")
      return messageResponseError
    }

    const hits = this.claimsToHits(response)
    const messageResponseHit: MessageResponseHit = {
      type: "Hit",
      hits: hits
    }
    return messageResponseHit
  }

  private claimsToHits(claims: string): Array<HitResult> {
    const parsedClaims = JSON.parse(claims)
    const hits = new Array<HitResult>()

    parsedClaims.claims.forEach((claim: any) => {
      hits.push({
        Checado: claim.claimReview[0].title,
        Checado_por: claim.claimReview[0].publisher.name,
        Data: claim.claimDate,
        Link: claim.claimReview[0].url
      })
    })
    return hits
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
