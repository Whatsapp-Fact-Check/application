export type messageResponseType = "CheckedFact" | "NoHit" | "Error"
export interface MessageResponse {
  type: messageResponseType
}
