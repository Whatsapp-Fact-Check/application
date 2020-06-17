const MessagingResponse = require("twilio").twiml.MessagingResponse

export class TwilioFormater {

  constructor() {}

  format(message: string): string {
    if (message.length > 1600){
        throw Error("Message has more than 1600 chars. Twilio support this number as maximum length")
    }
    // message.slice(0, Math.min(message.length, 1600)) //truncate to max 1600 chars
    
    let twiml = new MessagingResponse();
    twiml.message(message)
    return twiml.toString()
  }
}
