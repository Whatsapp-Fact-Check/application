import { MessageResponseHint } from '@/messageResponse/messageResponseHint';


export class HintProcessor {
    constructor() {
        
    }

    processText(text: string) : MessageResponseHint{
        let messageResponseHint: MessageResponseHint = {
            type: "Hint",
            hint: "NoHint"
        }
        
        if (text.split(' ').length > 10){
            messageResponseHint.hint = "LongText";
        }

        return messageResponseHint
    }
}