import { MessageResponse } from "./messageResponse"

export interface HitResult {
  Checado: string
  Data: string
  Checado_por: string
  Link: string
}
export interface MessageResponseHit extends MessageResponse {
  hits: HitResult[]
}
