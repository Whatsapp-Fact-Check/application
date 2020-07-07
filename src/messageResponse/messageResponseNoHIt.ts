import { MessageResponse } from "../messageResponse/messageResponse"

export interface News{
  Title: string
  Date: string
  Source: string
  Link: string
}

export interface MessageResponseNoHit extends MessageResponse {
  relatedNews?: News[]
}
