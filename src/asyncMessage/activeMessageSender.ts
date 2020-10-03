const client = require("twilio")(process.env.twilio_accountSid, process.env.twilio_authToken)

export class ActiveMessageSender {
  constructor() {}

  private static joaoNumber: string = "whatsapp:+14155238886"

  static sendMessage(whatsappNumber: string, message: string) {
    return new Promise((resolve, reject) => {
      client.messages
        .create({
          from: this.joaoNumber,
          body: message,
          to: whatsappNumber
        })
        .then((message: any) => {
          console.log("Active message sent: " + message.sid)
          resolve(message.sid)
        })
        .catch((error: any) => {
          console.log(error)
          reject(error)
        })
    })
  }

}
