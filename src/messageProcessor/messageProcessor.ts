import { MessageRequest } from "@/messageRequest/messageRequest"
import { MessageResponse } from "@/messageResponse/messageResponse"
import { Constructor } from "@/messageRouter/messageRouter"

export interface MessageProcessorInterface {
  type: string
  processMessage: (message: MessageRequest) => Promise<MessageResponse>
}

const messageProcessorImplementations: Constructor<MessageProcessorInterface>[] = []
function GetMessageProcessorImplementations(): Constructor<MessageProcessorInterface>[] {
  return messageProcessorImplementations
}
export function RegisterMessageProcessor<T extends Constructor<MessageProcessorInterface>>(ctor: T): T {
  messageProcessorImplementations.push(ctor)
  return ctor
}

export class MessageProcessor {
  private messageProcessors: Record<string, MessageProcessorInterface> = {}

  constructor() {
    this.initProcessor()
  }

  private initProcessor() {
    const messageProcessorImplementations = GetMessageProcessorImplementations()
    console.log("messageProcessorImplementations", messageProcessorImplementations)
    messageProcessorImplementations.forEach((MessageProcessor) => {
      const instance = new MessageProcessor()
      this.messageProcessors[instance.type] = instance
    })
  }

  public async processMessage(message: MessageRequest): Promise<MessageResponse> {
    const messageProcessor = this.messageProcessors[message.type]
    if (messageProcessor) {
      return await messageProcessor.processMessage(message)
    }
    throw Error("Message processor not registered: " + message.type)
  }
}
