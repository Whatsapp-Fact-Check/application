import { MessageResponse } from '@/messageResponse/messageResponse'
import { MessageResponseHint } from '@/messageResponse/messageResponseHint'
import { MessageResponseFormater, RegisterResponseFormater } from './messageFormatter'

@RegisterResponseFormater
export class HintFormater implements MessageResponseFormater {
  type: string

  constructor() {
    this.type = "Hint"
  }

  formatMessage(messageResponse: MessageResponse): string {
    const message = this.toMessageResponseHint(messageResponse)
    switch (message.hint) {
      case "LongText":
        return this.longTextHint()

      default:
        return ""
    }
  }

  private longTextHint(): string {
    return "Notamos que a mensagem enviada foi muito longa! Os resultados são mais precisos quando você manda textos curtos, " +
    "com as palavras chave do assunto que quer checar. Por exemplo, tente: Limão cura coronavírus."
  }

  private toMessageResponseHint(messageResponse: MessageResponse): MessageResponseHint {
    return messageResponse as MessageResponseHint
  }
}
