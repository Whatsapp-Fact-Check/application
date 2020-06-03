import { MessageResponse } from "../messageResponse/messageResponse"
export interface DomainResponse {
  url: string
  etc: string
}
export interface DomainSearch {
  domainResponse: DomainResponse
}

export interface ImageReverseSearch {
  url: string
}

export interface MessageResponseNoHit extends MessageResponse {
  domainSearch?: DomainSearch
  imageReverseSearch?: ImageReverseSearch
}
