import { MessageRequestError } from './messageRequestError'

export type messageRequestType = "text" | "link" | "image"
export interface MessageRequest {
  type: messageRequestType
  id: string
  timestamp: Date
}

export type messageRequestOrError = MessageRequest | MessageRequestError