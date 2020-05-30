/**
 * Recebe a mensagem do whatsapp, escolhe um processador de mensagem, chama um messageFormater
 * Lembrar de importar algo do messageProcessor
 */

import { MessageProcessor } from "../messageProcessor/messageProcessor"
import { MessageRequest } from "../messageRequest/messageRequest"
import { MessageResponse, MessageResponseFormater } from "../messageResponse/messageResponse"
import { MessageClassifier } from "./messageClassifier"

type Constructor<T> = {
  new (...args: any[]): T
  readonly prototype: T
}

const messageProcessorImplementations: Constructor<MessageProcessor>[] = []
function GetMessageProcessorImplementations(): Constructor<MessageProcessor>[] {
    return messageProcessorImplementations
}
export function RegisterMessageProcessor<T extends Constructor<MessageProcessor>>(ctor: T) {
    messageProcessorImplementations.push(ctor)
    return ctor
}


const messageResponseFormaterImplementations: Constructor<MessageResponseFormater>[] = []
function GetMessageResponseFormaterImplementations(): Constructor<MessageResponseFormater>[] {
    return messageResponseFormaterImplementations
}
export function RegisterResponseFormater<T extends Constructor<MessageResponseFormater>>(ctor: T) {
    messageResponseFormaterImplementations.push(ctor)
    return ctor
}


export class MessageRouter {
    private messageClassifier: MessageClassifier = new MessageClassifier()
    private messageProcessors: Record<string, MessageProcessor> = {}
    private messageResponseFormaters: Record<string, MessageResponseFormater> = {}

    constructor() {
        const messageProcessorImplementations = GetMessageProcessorImplementations()
        messageProcessorImplementations.forEach((MessageProcessor) => {
            const instance = new MessageProcessor()
            this.messageProcessors[instance.type] = instance
        })

        const messageResponseFormaterImplementations = GetMessageResponseFormaterImplementations()
        messageResponseFormaterImplementations.forEach((MessageResponseFormater) => {
            const instance = new MessageResponseFormater()
            this.messageResponseFormaters[instance.type] = instance
        })

    }

  public async processMessage(message: MessageRequest): Promise<string> {
    const type = this.findType(message)
    const messageProcessor = this.messageProcessors[type]
    const result = await messageProcessor.processMessage(message)
    return this.format(result)
  }

  private findType(message: MessageRequest) {
    return this.messageClassifier.classify(message)
  }

    private format(message: MessageResponse): string {
        //Chama por tipo. Usa o mesmo lance do processador
        // messageResponseFormaters[type]

        const messageResponseFormater = this.messageResponseFormaters[message.type]
        return messageResponseFormater.formatMessage(message)

    }

}
