import { MessageResponse } from "../messageResponse/messageResponse"
import { MessageResponseFormater, RegisterResponseFormater } from "."

@RegisterResponseFormater
export class RequestReceivedFormater implements MessageResponseFormater {
  type: string

  constructor() {
    this.type = "RequestReceived"
  }

  formatMessage(message: MessageResponse): string {
    return (
      "Recebemos sua mensagem! Estamos procurando..."
    )
  }
}
