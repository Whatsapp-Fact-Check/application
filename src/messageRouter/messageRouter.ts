/**
 * Recebe a mensagem do whatsapp, escolhe um processador de mensagem, chama um messageFormater
 * Lembrar de importar algo do messageProcessor
 */

import { MessageProcessor } from "../messageProcessor/messageProcessor"
import { MessageRequest } from "../messageRequest/messageRequest"
import { MessageResponse } from "../messageResponse/messageResponse"
import { MessageFormater } from "../messageFormater"

export type Constructor<T> = {
  new (...args: any[]): T
  readonly prototype: T
}

const messageProcessorImplementations: Constructor<MessageProcessor>[] = []
function GetMessageProcessorImplementations(): Constructor<MessageProcessor>[] {
  return messageProcessorImplementations
}
export function RegisterMessageProcessor<T extends Constructor<MessageProcessor>>(ctor: T): T {
  messageProcessorImplementations.push(ctor)
  return ctor
}

export class MessageRouter {
  private messageProcessors: Record<string, MessageProcessor> = {}
  private messageFormatter: MessageFormater

  constructor() {
    this.messageFormatter = new MessageFormater()

    const messageProcessorImplementations = GetMessageProcessorImplementations()
    messageProcessorImplementations.forEach((MessageProcessor) => {
      const instance = new MessageProcessor()
      this.messageProcessors[instance.type] = instance
    })
  }

  public async processMessage(message: MessageRequest): Promise<string> {
    const messageProcessor = this.messageProcessors[message.type]
    const result = await messageProcessor.processMessage(message)
    return this.format(result)
  }

  private format(message: MessageResponse): string {
    return this.messageFormatter.formatMessage(message)
  }
}
