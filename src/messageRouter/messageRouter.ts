
import { MessageProcessor } from "../messageProcessor"
import { MessageRequest } from "../messageRequest/messageRequest"
import { MessageResponse } from "../messageResponse/messageResponse"
import { MessageFormater } from "../messageFormater"

export type Constructor<T> = {
  new (...args: any[]): T
  readonly prototype: T
}

export class MessageRouter {
  private messageProcessor: MessageProcessor
  private messageFormatter: MessageFormater

  constructor() {
    this.messageProcessor = new MessageProcessor()
    this.messageFormatter = new MessageFormater()
  }

  public async processMessage(message: MessageRequest): Promise<string> {
    const result = await this.messageProcessor.processMessage(message)
    return this.format(result)
  }

  private format(message: MessageResponse): string {
    return this.messageFormatter.formatMessage(message)
  }
}
