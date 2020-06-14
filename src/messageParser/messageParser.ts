import { MessageRequest } from "../messageRequest/messageRequest"
import { Constructor } from '@/messageRouter/messageRouter';
import { wppMessageBody } from './wppMessageParser';

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
  parse: (messageBody: messageBody) => MessageRequest
}

export class MessageParser {

  private messageParsers: Record<string, MessageParserInterface> = {}

  constructor(){
    this.initParsers()
  }

  private initParsers() {
    const messageParserImplementations = GetMessageParserImplementations()
    console.log(messageParserImplementations)
    messageParserImplementations.forEach((MessageParser) => {
      const instance = new MessageParser()
      this.messageParsers[instance.type] = instance
    })
  }

  public parse(parserType:string, message: any) : MessageRequest{
      let parser = this.messageParsers[parserType]
      if (parser){
        return parser.parse(message)
      }
      throw Error("Message parser not defined: " + parserType)
  }
}











