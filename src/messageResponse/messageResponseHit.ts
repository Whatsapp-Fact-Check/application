import { MessageResponse, MessageResponseFormater } from "./messageResponse"

export interface HitResult {
    link: string
    title: string
}
export interface MessageResponseHit extends MessageResponse {
    hits: HitResult[]
}

// @RegisterMessageResponseFormater
export class HitFormater implements MessageResponseFormater {
    type: string

    constructor() {
        this.type = "Hit"
    }

    formatMessage(message: MessageResponse): string {
        return "HIT!!!!"
    }
}
