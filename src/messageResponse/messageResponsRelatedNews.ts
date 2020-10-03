import { MessageResponse } from "./messageResponse"

export interface News {
  Title: string
  Date: string
  Source: string
  Link: string
}

export interface MessageResponseRelatedNews extends MessageResponse {
  relatedNews: News[]
}
