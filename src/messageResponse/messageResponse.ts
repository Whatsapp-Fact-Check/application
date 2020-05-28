

 export type messageResponseType = "Hit" | "NoHit"
 export interface MessageResponse {
    type: messageResponseType

 }

 export interface MessageResponseFormater {
   type: string
   formatMessage: (message: MessageResponse) => string
}