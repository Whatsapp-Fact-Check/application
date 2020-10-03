import { MessageResponseCheckedFacts } from "@/messageResponse/MessageResponseCheckedFacts"
import { MessageResponseHint } from '@/messageResponse/messageResponseHint'

export abstract class HintFormater {
  constructor() {}

  formatHintMessage(messageResponse: MessageResponseHint): string {
    switch (messageResponse.hint) {
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

}
