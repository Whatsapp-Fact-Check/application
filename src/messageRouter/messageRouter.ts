import { MessageProcessor } from "../messageProcessor"
import { MessageResponse } from "../messageResponse/messageResponse"
import { MessageFormater } from "../messageFormater"
import { MessageResponseError } from '@/messageResponse/messageResponseError'
import { messageRequestOrError } from '@/messageRequest/messageRequest'

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

  public async processMessage(message: messageRequestOrError): Promise<string> {
    let result: MessageResponse
    if ("error" in message) {
      result = message as MessageResponseError //messageRequestError has same properties as messageResponseError
      result.type = "Error"
    } else {
      result = await this.messageProcessor.processMessage(message)
    }
    return this.format(result)
  }

  private format(message: MessageResponse): string {
    return this.messageFormatter.formatMessage(message)
  }
}
