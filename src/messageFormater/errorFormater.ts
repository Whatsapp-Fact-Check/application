import { MessageResponseFormater, RegisterResponseFormater } from "./messageFormatter"
import { MessageResponse } from "../messageResponse/messageResponse"
import { MessageResponseErrorInternal, MessageResponseErrorToNotifyUser } from "@/messageResponse/messageResponseError"

@RegisterResponseFormater
export class ErrorFormater implements MessageResponseFormater {
  type: string
  private newLine = "\n"

  constructor() {
    this.type = "Error"
  }

  formatMessage(message: MessageResponse): string {
    if (this.isMessageResponseErrorInternal(message)) {
      console.error("Error formater - internal error: ", message.errorInternal)
      return this.formatInternalError(message)
    }

    if (this.isMessageResponseErrorToNotifyUser(message)) {
      console.error("Error formater - to notify user error: ", message.errorToNotifyUser)
      return this.formatErrorToNotifyUser(message)
    }

    return this.formatInternalError({
      type: "Error",
      errorInternal: { error: new Error("MessageResponseError type not found") }
    })
  }

  private formatInternalError(message: MessageResponseErrorInternal): string {
    return "Encontramos um problema interno ao processar sua requisição, estamos trabalhando para corrigir 👨‍💻"
  }

  private formatErrorToNotifyUser(message: MessageResponseErrorToNotifyUser): string {
    if (message.errorToNotifyUser.errorType == "unsupportedMedia") {
      return "Ainda não suportamos imagem/vídeo/audio/link. Nos envie um texto curto descrevendo o fato que você quer checar!"
    }
    return this.formatInternalError({
      type: "Error",
      errorInternal: { error: new Error("ErrorToNotifyUser not found") }
    })
  }

  private isMessageResponseErrorInternal(message: MessageResponse): message is MessageResponseErrorInternal {
    return "errorInternal" in message
  }

  private isMessageResponseErrorToNotifyUser(message: MessageResponse): message is MessageResponseErrorToNotifyUser {
    return "errorToNotifyUser" in message
  }
}
