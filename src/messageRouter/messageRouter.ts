import { MessageProcessor } from "../messageProcessor"
import { MessageResponse } from "../messageResponse/messageResponse"
import { MessageFormater } from "../messageFormater"
import { MessageResponseErrorToNotifyUser, MessageResponseErrorInternal } from '@/messageResponse/messageResponseError'
import { messageRequestOrError } from '@/messageRequest/messageRequest'
import { ErrorToNotifyUser } from '@/error/errorToNotifyUser'
import { ErrorInternal } from '@/error/errorInternal'

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
      result = this.decideIfErrorIsInternalOrToNotify(message)
    } else {
      result = await this.messageProcessor.processMessage(message)
    }
    return this.format(result)
  }
  
  private decideIfErrorIsInternalOrToNotify(message: ErrorToNotifyUser | ErrorInternal): MessageResponse {
    if ("errorType" in message){
      return {
        type: "Error",
        errorToNotifyUser: message
      } as MessageResponseErrorToNotifyUser
    }
    else{
      return {
        type: "Error",
        errorInternal: message,
      } as MessageResponseErrorInternal
    }
  }

  private format(message: MessageResponse): string {
    return this.messageFormatter.formatMessage(message)
  }
}
