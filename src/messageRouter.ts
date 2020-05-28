/**
 * Recebe a mensagem do whatsapp, escolhe um processador de mensagem, chama um messageFormater
 * Lembrar de importar algo do messageProcessor
 */

import { MessageProcessor } from './messageProcessor/messageProcessor'
import { MessageRequest } from './messageRequest'
import { MessageResponse } from './messageResponse/messageResponse'


type Constructor<T> = {
    new (...args: any[]): T
    readonly prototype: T
  }
  const implementations: Constructor<MessageProcessor>[] = []
  function GetImplementations(): Constructor<MessageProcessor>[] {
    return implementations
  }
  export function RegisterMessageProcessor<T extends Constructor<MessageProcessor>>(
    ctor: T
  ) {
    implementations.push(ctor)
    return ctor
  }
  

  export class MessageRouter {
    private messageProcessors: Record<string, MessageProcessor> = {}
      
    constructor() {      
      const implementations = GetImplementations()
      implementations.forEach(MessageProcessor => {
        const instance = new MessageProcessor()
        this.messageProcessors[instance.type] = instance
      })
    }

    public async processMessage(message:MessageRequest):Promise<string>{
        const type = this.findType(message)
        const messageProcessor = this.messageProcessors[type]
        const result = await messageProcessor.processMessage(message)
        return this.format(result)
    }

    private findType(message:MessageRequest){
        return "text"
    }


    private format(message:MessageResponse):string{
        //Chama por tipo. Usa o mesmo lance do processador
        return ""
    }
  }