
export type messageRequestType = "text" | "link" | "image"
export interface MessageRequest {
  type: messageRequestType
  id: string
  timestamp: Date
}
