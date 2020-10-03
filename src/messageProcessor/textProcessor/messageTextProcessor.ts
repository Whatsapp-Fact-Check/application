import { MessageProcessorInterface, RegisterMessageProcessor } from "../messageProcessor"
import { MessageRequest } from "../../messageRequest/messageRequest"
import { MessageResponse } from "../../messageResponse/messageResponse"
import { MessageRequestText } from "../../messageRequest/messageRequestText"
import { FactCheckSearcher } from "./searches/factCheck"
import { RelatedNewsSearcher } from "./searches/relatedNews"
import { HintProcessor } from "./hintProcessor"
import { MessageResponseHint } from "@/messageResponse/messageResponseHint"
import { ActiveMessageSender } from "../../asyncMessage/activeMessageSender"

@RegisterMessageProcessor
export class MessageTextProcessor implements MessageProcessorInterface {
  type: string

  private factCheckSearcher: FactCheckSearcher = new FactCheckSearcher()
  private relatedNewsSearcher: RelatedNewsSearcher = new RelatedNewsSearcher()
  private hintProcessor: HintProcessor = new HintProcessor()

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

        let messageResponseHint = this.getMessageResponseHint(text)
        if (messageResponseHint.hint != "NoHint") {
          ActiveMessageSender.sendMessage(messageRequestText.id, "teste")
        }

      } catch (error) {
        reject(error)
      }
    })
  }

  private getMessageResponseHint(text: string): MessageResponseHint {
    return this.hintProcessor.processText(text)
  }

  private isMessageResponseNoHit(messageResponse: MessageResponse): boolean {
    return messageResponse.type == "NoHit"
  }

  private toMessageRequestText(message: MessageRequest): MessageRequestText {
    return message as MessageRequestText
  }
}
