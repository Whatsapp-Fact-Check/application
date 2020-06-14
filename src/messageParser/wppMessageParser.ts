import { MessageParserInterface, RegisterMessageParser, messageBody } from "./messageParser"
import { MessageRequest } from "../messageRequest/messageRequest"
import { MessageRequestImage } from "@/messageRequest/messageRequestImage"
import { MessageRequestLink } from "@/messageRequest/messageRequestLink"
import { MessageRequestText } from "@/messageRequest/messageRequestText"

export interface wppMessageBody {
  SmsMessageSid: string
  NumMedia: string
  MediaUrl0?: string
  MediaContentType0?: string
  SmsSid: string
  SmsStatus: string
  Body: string
  To: string
  NumSegments: string
  MessageSid: string
  AccountSid: string
  From: string
  ApiVersion: string
}

@RegisterMessageParser
export class WppMessageParser implements MessageParserInterface {
  type: string
  private wppNumber: string = ""
  private text: string = ""
  private mediaType: string = ""
  private mediaUrl: string = ""

  constructor() {
    this.type = "wpp"
  }

  parse(messageBody: wppMessageBody): MessageRequest {
    if (!this.isWppMessageBody(messageBody)) {
      throw Error("MessageBody does not match the expected: " + messageBody)
    }

    this.parseMessageText(messageBody)
    this.parseMedia(messageBody)
    this.parseWhatsappNumber(messageBody)

    return this.getMessageRequest()
  }

  private isWppMessageBody(messageBody: wppMessageBody): messageBody is wppMessageBody {
    return "NumMedia" in messageBody && "Body" in messageBody && "From" in messageBody
  }

  private parseWhatsappNumber(messageBody: wppMessageBody) {
    this.wppNumber = messageBody.From
  }

  private parseMedia(messageBody: wppMessageBody) {
    if (parseInt(messageBody.NumMedia) == 1) {
      this.mediaType = this.getMediaType(messageBody.MediaContentType0 as string)
      this.mediaUrl = messageBody.MediaUrl0 as string
    }
  }

  private getMediaType(mediaType: string): string {
    return mediaType.split("/")[0] //media type come as image/jpeg or video/mp4. Take just image or video, without the file extension
  }

  private parseMessageText(messageBody: wppMessageBody) {
    this.text = messageBody.Body
  }

  private getMessageRequest(): MessageRequest {
    if (this.isImageRequest()) {
      return this.getImageRequest() as MessageRequest
    } else if (this.isLinkRequest()) {
      return this.getLinkRequest() as MessageRequest
    } else if (this.isTextRequest()) {
      return this.getTextRequest() as MessageRequest
    }

    throw Error("Could not create message request: invalid message received (empty text or media type not supported)")
  }

  private isImageRequest(): boolean {
    return this.mediaType == "image"
  }
  private getImageRequest(): MessageRequestImage {
    return {
      type: "image",
      id: this.wppNumber,
      timestamp: this.getTimestamp(),
      mediaType: this.mediaType,
      mediaUrl: this.mediaUrl
    }
  }

  private isLinkRequest(): boolean {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ) // fragment locator
    return !!pattern.test(this.text)
  }
  private getLinkRequest(): MessageRequestLink {
    return {
      type: "link",
      id: this.wppNumber,
      timestamp: this.getTimestamp(),
      url: this.text
    }
  }

  private isTextRequest(): boolean {
    return this.text != ""
  }
  private getTextRequest(): MessageRequestText {
    return {
      type: "text",
      id: this.wppNumber,
      timestamp: this.getTimestamp(),
      text: this.text
    }
  }

  private getTimestamp(): Date {
    return new Date()
  }
}
