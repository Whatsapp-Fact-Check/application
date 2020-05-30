import { MessageResponse, MessageResponseFormater } from "./messageResponse"
import { RegisterResponseFormater } from "@/messageRouter/messageRouter"

export interface HitResult {
    link: string
    title: string
}
export interface MessageResponseHit extends MessageResponse {
    hits: HitResult[]
}

@RegisterResponseFormater
export class HitFormater implements MessageResponseFormater {
    type: string

    constructor() {
        this.type = "Hit"
    }

    formatMessage(message: MessageResponse): string {
        return "HIT!!!!"

            //aqui temos o objeto DATABASERESPONSE com todos os parametros da query
            // retornaremos o texto formatada de acordo com os schemas descritos pelo Veloso nos screenschots - em aguardo


    }
}
