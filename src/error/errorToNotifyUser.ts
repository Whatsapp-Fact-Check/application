
export type errorType = "unsupportedMedia" 
export interface ErrorToNotifyUser {
  error: Error
  errorType: errorType
}