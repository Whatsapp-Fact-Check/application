const MessagingResponse = require("twilio").twiml.MessagingResponse

export class TwilioFormater {
  constructor() {}
  private doubleLine = "\n\n"

  format(message: string): string {
    if (message.length >= 1600) {
      message = this.getTruncatedMessage(message)
    }

    let twiml = new MessagingResponse()
    twiml.message(message)
    return twiml.toString()
  }

  private getTruncatedMessage(message: string) : string {
    message = message.slice(0, Math.min(message.length, 1600)) //truncate to max 1600 chars

    let lastNewsIndex = message.lastIndexOf(this.doubleLine)
    if (lastNewsIndex != -1){
      message = message.slice(0, lastNewsIndex) //truncate to get the last news possible
    }
    else{
      console.log("Twilio Formater - Did not find double line to split news. Return truncated message: " + message)
    }

    return message
  }
}
