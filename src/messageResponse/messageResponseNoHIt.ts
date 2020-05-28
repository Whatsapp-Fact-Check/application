import { MessageResponse, MessageResponseFormater } from './messageResponse';


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

// @RegisterMessageResponseFormater
export class NoHitFormater implements MessageResponseFormater {
   type: string;

   constructor(){
       this.type = "NoHit"
   }

   formatMessage(message: MessageResponse) : string{
       return "NO HIT!!!!"
   }

}