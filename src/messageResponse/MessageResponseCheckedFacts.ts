import { MessageResponse } from "./messageResponse"

export interface CheckedFact {
  Checado: string
  Data: string
  Checado_por: string
  Link: string
}
export interface MessageResponseCheckedFacts extends MessageResponse {
  checkedFacts: CheckedFact[]
}
