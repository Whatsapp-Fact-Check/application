import { MessageResponse } from "./messageResponse"
import { MessageResponseHint } from './messageResponseHint';

export interface News {
  Title: string
  Date: string
  Source: string
  Link: string
}

export interface MessageResponseRelatedNews extends MessageResponse,MessageResponseHint {
  relatedNews: News[]
}
