import { MessageResponseFormater, RegisterResponseFormater } from "./messageFormatter"
import { MessageResponse } from "../messageResponse/messageResponse"
import { MessageResponseError } from "../messageResponse/messageResponseError"

@RegisterResponseFormater
export class ErrorFormater implements MessageResponseFormater {
  type: string
  private newLine = "\n"

  constructor() {
    this.type = "Error"
  }

  formatMessage(message: MessageResponse): string {
    const messageResponseError = this.toMessageResponseError(message)

    console.log("Error coming from messageProcessor: " + messageResponseError.error.message)
    const formattedString = "Desculpe, houve um problema"

    return formattedString
  }

  private toMessageResponseError(message: MessageResponse): MessageResponseError {
    return message as MessageResponseError
  }
}
