import { MessageRequest } from '@/messageRequest';
import { MessageResponse } from '@/messageResponse/messageResponse';



 export interface MessageProcessor {
    type: string
   processMessage: (message: MessageRequest) => Promise<MessageResponse>
}