import { MessageResponse } from "../messageResponse/messageResponse"
import { Constructor } from "../messageRouter/messageRouter"

const messageResponseFormaterImplementations: Constructor<MessageResponseFormater>[] = []
export function GetMessageResponseFormaterImplementations(): Constructor<MessageResponseFormater>[] {
  return messageResponseFormaterImplementations
}
export function RegisterResponseFormater<T extends Constructor<MessageResponseFormater>>(ctor: T): T {
  messageResponseFormaterImplementations.push(ctor)
  return ctor
}

export interface MessageResponseFormater {
  type: string
  formatMessage: (message: MessageResponse) => string
}

export class MessageFormater {
  private messageResponseFormaters: Record<string, MessageResponseFormater> = {}

  formatMessage(message: MessageResponse): string {
    const messageFormatter = this.messageResponseFormaters[message.type]
    if (messageFormatter) {
      return messageFormatter.formatMessage(message)
    }
    throw new Error("Tipo da mensagem desconhecido:" + message.type)
  }

  constructor() {
    const messageResponseFormaterImplementations = GetMessageResponseFormaterImplementations()
    console.log("messageResponseFormaterImplementations", messageResponseFormaterImplementations)
    messageResponseFormaterImplementations.forEach((MessageResponseFormater) => {
      const instance = new MessageResponseFormater()
      this.messageResponseFormaters[instance.type] = instance
    })
  }
}
