import { MessageResponseErrorInternal } from '@/messageResponse/messageResponseError'
import { MessageResponse } from '@/messageResponse/messageResponse'
import { httpResponseOrError } from './httpRequest'
import { ErrorInternal } from '@/error/errorInternal'



export abstract class HttpParser {

  constructor() {}

  abstract parseMessage(response: httpResponseOrError) : MessageResponse | Promise<MessageResponse>

  protected isHttpError(response: httpResponseOrError): response is ErrorInternal {
    return (typeof response !== "string")
  }
  
  protected createMessageResponseErrorInternal(error: Error): MessageResponseErrorInternal {
    const messageResponseError: MessageResponseErrorInternal = {
      type: "Error",
      errorInternal: { error: error }
    }
    return messageResponseError
  }
}
