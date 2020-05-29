import { MessageRequest } from "./messageRequest"

export interface MessageParser {
    type: string
    messageRequest: MessageRequest
    parse: (messageBody: any) => MessageRequest
}
