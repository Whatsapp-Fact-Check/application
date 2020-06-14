import { MessageProcessorInterface, RegisterMessageProcessor } from "../messageProcessor"
import { MessageRequest } from "@/messageRequest/messageRequest"
import { MessageResponse } from "@/messageResponse/messageResponse"

@RegisterMessageProcessor
export class MessageImageProcessor implements MessageProcessorInterface {
  type: string
  processMessage(message: MessageRequest): Promise<MessageResponse> {
    return new Promise<MessageResponse>((resolve, reject) => {})
  }
  constructor() {
    this.type = "image"
  }
}
