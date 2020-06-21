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

    let messageResponseError = this.toMessageResponseError(message)    
    let formattedString = ""

    if (messageResponseError.errorType == "invalidMedia"){
      formattedString = "Ainda não suportamos imagem/vídeo/audio/link. Nos envie um texto curto descrevendo o fato que você quer checar!"
    }
    else{ //internal error
      formattedString = "Encontramos um problema interno ao processar sua requisição, estamos trabalhando para corrigir 👨‍💻"
    }

    console.log("Message Response Error: " + messageResponseError.error.message)
    return formattedString
  }

  private toMessageResponseError(message: MessageResponse): MessageResponseError {
    return message as MessageResponseError
  }
}
