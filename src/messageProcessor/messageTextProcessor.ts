import { RegisterMessageProcessor } from '@/messageRouter';
import { MessageProcessor } from './messageProcessor';
import { MessageRequest } from '@/messageRequest';
import { MessageResponse } from '@/messageResponse/messageResponse';



@RegisterMessageProcessor
export class MessageTextProcessor implements MessageProcessor {
    type: string;
    processMessage(message: MessageRequest):Promise<MessageResponse>{
        return new Promise<MessageResponse>((resolve, reject) => {

        })
    }
    constructor(){
        this.type = "text"
    }

}