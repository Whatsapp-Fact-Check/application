import { MessageResponse } from './messageResponse';


 export interface HitResult {
    link:string
    title:string
}
export interface MessageResponseHit extends MessageResponse {
    hits: HitResult[]
}