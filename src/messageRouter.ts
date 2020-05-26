/**
 * Recebe a mensagem do whatsapp, escolhe um processador de mensagem, chama um messageFormater
 * Lembrar de importar algo do messageProcessor
 */

export interface MessageRequest {
    text: string
    urlMedia?: string    
    whatsapp: string    
}

 export interface MessageProcessor {
     type: string
    processMessage: (message: MessageRequest) => Promise<MessageResponse>
 }

 export type messageResponseType = "Hit" | "NoHit"
 export interface MessageResponse {
    type: messageResponseType

 }

 export interface HitResult {
     link:string
     title:string
 }
 export interface MessageResponseHit extends MessageResponse {
     hits: HitResult[]
 }

 export interface DomainResponse {
     url:string
     etc:string
 }
 export interface DomainSearch {
     domainResponse:DomainResponse
 }

 export interface ImageReverseSearch {
    url:string
 }

 export interface MessageResponseNoHit extends MessageResponse {
    domainSearch?: DomainSearch
    imageReverseSearch?: ImageReverseSearch
}


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