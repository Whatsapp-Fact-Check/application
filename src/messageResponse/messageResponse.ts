export type messageResponseType = "CheckedFact" | "RelatedNews" | "NoHit" | "Error"
export interface MessageResponse {
  type: messageResponseType
}
