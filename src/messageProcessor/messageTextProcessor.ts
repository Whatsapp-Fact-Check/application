import { MessageProcessor, MessageRequest, MessageResponse, RegisterMessageProcessor } from "../messageRouter";


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