import { HttpError } from "@/messageProcessor/http/httpRequest"
import { MessageResponse } from "@/messageResponse/messageResponse"
import { HttpParser } from "../../http/httpParser"
import { CheckedFact, MessageResponseCheckedFacts } from "@/messageResponse/MessageResponseCheckedFacts"
import { MessageResponseNoHit } from "@/messageResponse/messageResponseNoHit"
import { GoogleFactCheckFilter } from "./googleFactCheckFilter"

export interface claim {
  text: string
  claimant: string
  claimDate: string
  claimReview: claimReview[]
}

export interface claimReview {
  publisher: {
    name: string
    site: string
  }
  url: string
  title?: string
  reviewDate: string
  textualRating: string
  languageCode: string
}

export interface GoogleFactCheckResponse {
  claims: claim[]
}

export class GoogleFactCheckParser extends HttpParser {
  private dateTranslationMap: Map<string, string> = new Map()
  private factCheckFilter: GoogleFactCheckFilter = new GoogleFactCheckFilter()

  constructor() {
    super()
    this.dateTranslationMap.set("01", "Janeiro")
    this.dateTranslationMap.set("02", "Fevereiro")
    this.dateTranslationMap.set("03", "Março")
    this.dateTranslationMap.set("04", "Abril")
    this.dateTranslationMap.set("05", "Maio")
    this.dateTranslationMap.set("06", "Junho")
    this.dateTranslationMap.set("07", "Julho")
    this.dateTranslationMap.set("08", "Agosto")
    this.dateTranslationMap.set("09", "Setembro")
    this.dateTranslationMap.set("10", "Outubro")
    this.dateTranslationMap.set("11", "Novembro")
    this.dateTranslationMap.set("12", "Dezembro")
  }

  parseMessage(response: string | HttpError): MessageResponse {
    if (this.isHttpError(response)) {
      const messageResponseError = this.createMessageResponseErrorInternal(response.error)
      return messageResponseError
    }

    if (!this.isJson(response)) {
      const messageResponseError = this.createMessageResponseErrorInternal("NotJsonStructure")
      return messageResponseError
    }

    const parsedResponse = JSON.parse(response)
    return this.getMessageResponse(parsedResponse)
  }

  private getMessageResponse(factCheckResponse: any): MessageResponse {
    if (this.isEmptyResponse(factCheckResponse)) {
      return this.getMessageResponseNoHit()
    }

    if (!this.isGoogleFactCheckResponse(factCheckResponse)) {
      const messageResponseError = this.createMessageResponseErrorInternal(
        "Invalid Response Body from Google Fact Check"
      )
      return messageResponseError
    }

    const checkedFacts = this.claimsToCheckedFacts(factCheckResponse as GoogleFactCheckResponse)

    if (checkedFacts.length == 0) {
      return this.getMessageResponseNoHit() //this case occurs when all the news does not have title
    } else {
      const messageResponseCheckedFact: MessageResponseCheckedFacts = {
        type: "CheckedFact",
        checkedFacts: checkedFacts
      }
      return messageResponseCheckedFact
    }
  }

  private getMessageResponseNoHit(): MessageResponse {
    const messageResponseNoHit: MessageResponseNoHit = {
      type: "NoHit"
    }
    return messageResponseNoHit
  }

  private isEmptyResponse(response: any): boolean {
    return Object.keys(response).length === 0
  }

  private isGoogleFactCheckResponse(response: any): response is GoogleFactCheckResponse {
    return "claims" in response && "claimReview" in response.claims[0] //sanity check: just to be sure there is at least one claimReview
  }

  private claimsToCheckedFacts(factCheckResponse: GoogleFactCheckResponse): Array<CheckedFact> {
    let checkedFacts = new Array<CheckedFact>()

    factCheckResponse.claims.forEach((claim: claim) => {
      claim.claimReview.forEach((claimReview: claimReview) => {
        if (this.claimHasAllProperties(claimReview)) {
          checkedFacts.push({
            Checado: claimReview.title as string,
            Checado_por: claimReview.publisher.name,
            Data: this.formatDate(claimReview.reviewDate),
            Link: claimReview.url
          })
        }
      })
    })

    return this.factCheckFilter.filterFactCheckHits(checkedFacts)
  }

  private claimHasAllProperties(claimReview: claimReview): boolean {
    return (
      "title" in claimReview &&
      "publisher" in claimReview &&
      "name" in claimReview.publisher &&
      "reviewDate" in claimReview &&
      "url" in claimReview
    )
  }

  private formatDate(date: string): string {
    let words = date.substring(0, 10).split("-")
    return words[2] + " " + this.dateTranslationMap.get(words[1]) + " " + words[0]
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
