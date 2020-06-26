import { messageRequestOrError } from "@/messageRequest/messageRequest"
import { MessageResponse } from "@/messageResponse/messageResponse"
import { ErrorInternal } from "@/error/errorInternal"
import { SystemFileSaver } from "./systemFileSaver"
const serialize = require('serialize-javascript');
const {serializeError} = require('serialize-error');

export type saveMessageResponse = boolean | ErrorInternal
export interface MessageSaverInterface {
  save(data: string): Promise<saveMessageResponse>
}

export class MessageSaver {
  private messageSaverImplementation: MessageSaverInterface

  constructor() {
    this.messageSaverImplementation = new SystemFileSaver()
  }

  async saveMessage(messageRequestOrError: messageRequestOrError, messageResponse: MessageResponse, formatedMessageResponse: string) {
    let data: string = serialize({
      messageRequestOrError: this.isError(messageRequestOrError) ? serializeError(messageRequestOrError) : messageRequestOrError ,
      messageResponse: this.isMessageResponseError(messageResponse) ? serializeError(messageResponse) : messageResponse,
      formatedMessageResponse: formatedMessageResponse
    })
    data += "\n"

    try {
      let result = await this.messageSaverImplementation.save(data)
      if (typeof result != "boolean") {
        result = result as ErrorInternal
        console.error("MessageSaver error - failed to save message: " + result.error)
      }
    } catch (error) {
      console.error("MessageSaver error - failed to save message: " + error)
    }
  }
  
  private isMessageResponseError(messageResponse: MessageResponse) : boolean{
    return messageResponse.type == "Error"
  }
  
  private isError(messageRequestOrError: messageRequestOrError): boolean{
    return "error" in messageRequestOrError
  }
}
