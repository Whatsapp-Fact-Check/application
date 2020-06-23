import { ErrorToNotifyUser } from '@/error/errorToNotifyUser'
import { ErrorInternal } from '@/error/errorInternal'

export type messageRequestType = "text" | "link" | "image"
export interface MessageRequest {
  type: messageRequestType
  id: string
  timestamp: Date
}

export type messageRequestOrError = MessageRequest | ErrorToNotifyUser | ErrorInternal