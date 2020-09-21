import { MessageProcessorInterface, RegisterMessageProcessor } from "../messageProcessor"
import { MessageRequest } from "../../messageRequest/messageRequest"
import { MessageResponse } from "../../messageResponse/messageResponse"
import { MessageRequestText } from "../../messageRequest/messageRequestText"
import { FactCheckSearcher } from './searches/factCheck'
import { RelatedNewsSearcher } from './searches/relatedNews'

@RegisterMessageProcessor
export class MessageTextProcessor implements MessageProcessorInterface {
  type: string

  private factCheckSearcher  : FactCheckSearcher = new FactCheckSearcher()
  private relatedNewsSearcher  : RelatedNewsSearcher = new RelatedNewsSearcher()

  constructor() {
    this.type = "text"
  }

  processMessage(message: MessageRequest): Promise<MessageResponse> {
    return new Promise<MessageResponse>(async (resolve, reject) => {
      const messageRequestText = this.toMessageRequestText(message)
      const text = messageRequestText.text

      try {
        let messageResponse = await this.factCheckSearcher.searchFactChecks(text)
        if (this.isMessageResponseNoHit(messageResponse)) {
          messageResponse = await this.relatedNewsSearcher.searchRelatedNews(text)
        }
        resolve(messageResponse)
      } catch (error) {
        reject(error)
      }
    })
  }

  private isMessageResponseNoHit(messageResponse: MessageResponse): boolean {
    return messageResponse.type == "NoHit"
  }

  private toMessageRequestText(message: MessageRequest): MessageRequestText {
    return message as MessageRequestText
  }
}
