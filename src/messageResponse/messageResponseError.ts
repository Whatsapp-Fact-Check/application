import { MessageResponse } from "./messageResponse"

export interface MessageResponseError extends MessageResponse {
  error: Error
}
