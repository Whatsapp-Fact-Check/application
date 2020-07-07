import { HttpError } from './httpRequest'
import { MessageResponseErrorInternal } from '@/messageResponse/messageResponseError'
import { MessageResponse } from '@/messageResponse/messageResponse'



export abstract class HttpParser {

  constructor() {}

   //e se tiver um parser q retorna outra coisa? any ou union type?
  abstract parseMessage(response: string | HttpError) : MessageResponse | Promise<MessageResponse>

  protected isHttpError(response: string | HttpError): response is HttpError {
    if (response !== undefined && (response as HttpError).error) {
      return true
    }
    return false
  }
  
  protected createMessageResponseErrorInternal(error: string): MessageResponseErrorInternal {
    const messageResponseError: MessageResponseErrorInternal = {
      type: "Error",
      errorInternal: { error: new Error(error) }
    }
    return messageResponseError
  }
}
