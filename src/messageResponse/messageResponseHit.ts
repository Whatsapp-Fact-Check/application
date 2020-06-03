import { MessageResponse } from "./messageResponse"

export interface HitResult {
  checado: string
  data: string
  checado_por: string
  link: string
}
export interface MessageResponseHit extends MessageResponse {
  hits: HitResult[]
}
