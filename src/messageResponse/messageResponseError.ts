import { MessageResponse } from "./messageResponse"

export type errorType = "invalidMedia" | "internal"
export interface MessageResponseError extends MessageResponse {
  error: Error
  errorType: errorType
}
