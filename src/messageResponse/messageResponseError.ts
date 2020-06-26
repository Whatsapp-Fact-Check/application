import { MessageResponse } from "./messageResponse"
import { ErrorToNotifyUser } from '@/error/errorToNotifyUser'
import { ErrorInternal } from '@/error/errorInternal'

export interface MessageResponseErrorInternal extends MessageResponse {
  errorInternal: ErrorInternal
}

export interface MessageResponseErrorToNotifyUser extends MessageResponse {
  errorToNotifyUser: ErrorToNotifyUser
}