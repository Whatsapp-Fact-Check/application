import { DataBaseResponse } from '@/messageProcessor/textProcessor/dataBaseResponse';

export type messageResponseType = "Hit" | "NoHit"
export interface MessageResponse {
    type: messageResponseType
    dataBaseResponse: DataBaseResponse
}

export interface MessageResponseFormater {
    type: string
    formatMessage: (message: MessageResponse) => string
}
