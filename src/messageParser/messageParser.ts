import { Constructor } from "@/messageRouter/messageRouter"
import { wppMessageBody } from "./wppMessageParser"
import { MessageRequestError } from '@/messageRequest/messageRequestError'
import { messageRequestOrError } from '@/messageRequest/messageRequest'

const messageParserImplementations: Constructor<MessageParserInterface>[] = []
function GetMessageParserImplementations(): Constructor<MessageParserInterface>[] {
  return messageParserImplementations
}
export function RegisterMessageParser<T extends Constructor<MessageParserInterface>>(ctor: T): T {
  messageParserImplementations.push(ctor)
  return ctor
}

export type messageBody = wppMessageBody
export interface MessageParserInterface {
  type: string
  parse: (messageBody: messageBody) => messageRequestOrError
}

export class MessageParser {
  private messageParsers: Record<string, MessageParserInterface> = {}

  constructor() {
    this.initParsers()
  }

  private initParsers() {
    const messageParserImplementations = GetMessageParserImplementations()
    console.log("messageParserImplementations", messageParserImplementations)
    messageParserImplementations.forEach((MessageParser) => {
      const instance = new MessageParser()
      this.messageParsers[instance.type] = instance
    })
  }

  private initParser(type: string) : MessageParserInterface | undefined{
    let parser
    const messageParserImplementations = GetMessageParserImplementations()
    messageParserImplementations.forEach((MessageParser) => {
      const instance = new MessageParser()
      if (instance.type == type){
        parser = instance
      }
    })

    return parser
  }

  public parse(parserType: string, message: any): messageRequestOrError {
    let parser = this.initParser(parserType)
    if (parser) {
      return parser.parse(message)
    }
    return this.getInvalidParserError()
  }
  
  private getInvalidParserError(): MessageRequestError {
    return {
      error: new Error("Message Parser: Invalid parser type"),
      errorType: "internal"
    }
  }
}
