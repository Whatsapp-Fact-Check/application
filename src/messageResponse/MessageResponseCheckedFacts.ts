import { MessageResponse } from "./messageResponse"
import { MessageResponseHint } from './messageResponseHint';

export interface CheckedFact {
  Checado: string
  Data: string
  Checado_por: string
  Link: string
}
export interface MessageResponseCheckedFacts extends MessageResponseHint {
  checkedFacts: CheckedFact[]
}
