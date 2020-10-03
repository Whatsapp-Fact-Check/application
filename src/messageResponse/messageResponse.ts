export type messageResponseType = "CheckedFact" | "RelatedNews" | "NoHit" | "Error" | "Hint" | "RequestReceived"
export interface MessageResponse {
  type: messageResponseType
}
