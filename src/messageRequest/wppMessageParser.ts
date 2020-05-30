import { MessageParser } from "./messageParser"
import { MessageRequest } from "./messageRequest"

export class WppMessageParser implements MessageParser {
  messageRequest: MessageRequest = {} as MessageRequest
  type: string

  constructor() {
    this.type = "wpp"
  }

  parse(messageBody: string): MessageRequest {
    return { text: messageBody }
  }
}
