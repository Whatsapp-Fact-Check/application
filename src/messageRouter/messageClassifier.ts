import { MessageRequest } from "@/messageRequest/messageRequest"

export class MessageClassifier {
  constructor() {}

  classify(message: MessageRequest): string {
    return "text"
  }
}
