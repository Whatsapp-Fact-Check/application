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

    const formattedString =
      "Tivemos um erro do tipo: " +
      messageResponseError.error.message +
      this.newLine +
      "Entra em contato com a gente se continuar acontecendo!"

    return formattedString
  }

  private toMessageResponseError(message: MessageResponse): MessageResponseError {
    return message as MessageResponseError
  }
}
