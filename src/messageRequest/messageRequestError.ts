import { errorType } from "@/messageResponse/messageResponseError"

export interface MessageRequestError {
  error: Error
  errorType: errorType
}
