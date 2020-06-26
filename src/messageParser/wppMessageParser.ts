import { MessageParserInterface, RegisterMessageParser, messageBody } from "./messageParser"
import { MessageRequestImage } from "@/messageRequest/messageRequestImage"
import { MessageRequestLink } from "@/messageRequest/messageRequestLink"
import { MessageRequestText } from "@/messageRequest/messageRequestText"
import { messageRequestOrError } from "@/messageRequest/messageRequest"
import { ErrorInternal } from "@/error/errorInternal"
import { ErrorToNotifyUser } from "@/error/errorToNotifyUser"

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

interface media {
  mediaType: string
  mediaUrl: string
}

@RegisterMessageParser
export class WppMessageParser implements MessageParserInterface {
  type: string

  constructor() {
    this.type = "wpp"
  }

  parse(messageBody: wppMessageBody): messageRequestOrError {
    if (!this.isWppMessageBody(messageBody)) {
      return this.getInvalidWppBodyError(messageBody)
    }

    let text: string = this.parseMessageText(messageBody)
    let wppNumber: string = this.parseWhatsappNumber(messageBody)
    let media: media = this.parseMedia(messageBody)

    return this.decideMessageRequestType(text, wppNumber, media)
  }

  private isWppMessageBody(messageBody: wppMessageBody): messageBody is wppMessageBody {
    return "NumMedia" in messageBody && "Body" in messageBody && "From" in messageBody
  }

  private getInvalidWppBodyError(messageBody: string): ErrorInternal {
    return {
      error: new Error("MessageBody does not match the expected: " + messageBody)
    }
  }

  private parseWhatsappNumber(messageBody: wppMessageBody): string {
    return messageBody.From
  }

  private parseMedia(messageBody: wppMessageBody): media {
    let media: media = {
      mediaUrl: "",
      mediaType: ""
    }

    if (parseInt(messageBody.NumMedia) == 1) {
      media.mediaType = this.getMediaType(messageBody.MediaContentType0 as string)
      media.mediaUrl = messageBody.MediaUrl0 as string
    }
    return media
  }

  private getMediaType(mediaType: string): string {
    return mediaType.split("/")[0] //media type come as image/jpeg or video/mp4. Take just image or video, without the file extension
  }

  private parseMessageText(messageBody: wppMessageBody): string {
    return messageBody.Body
  }

  private decideMessageRequestType(text: string, wppNumber: string, media: media): messageRequestOrError {
    // if (this.isImageRequest()) {
    //   return this.getImageRequest()
    // } else if (this.isLinkRequest()) {
    //   return this.getLinkRequest()
    // } else if (this.isTextRequest()) {
    //   return this.getTextRequest()
    // }
    if (this.isTextRequest(text, media)) {
      return this.getTextRequest(text, wppNumber)
    }
    return this.getUnsupportedMediaError()
  }

  private getUnsupportedMediaError(): ErrorToNotifyUser {
    return {
      errorType: "unsupportedMedia",
      error: new Error(
        "Could not create message request: invalid message received (media type not supported)"
      )
    }
  }

  private isTextRequest(text: string, media: media): boolean {
    return !this.isLinkRequest(text) && media.mediaType == ""
  }
  private getTextRequest(text: string, wppNumber: string): MessageRequestText {
    return {
      type: "text",
      id: wppNumber,
      timestamp: this.getTimestamp(),
      text: text
    }
  }

  private isImageRequest(media: media): boolean {
    return media.mediaType == "image"
  }
  private getImageRequest(wppNumber: string, media: media): MessageRequestImage {
    return {
      type: "image",
      id: wppNumber,
      timestamp: this.getTimestamp(),
      mediaType: media.mediaType,
      mediaUrl: media.mediaUrl
    }
  }

  private isLinkRequest(text: string): boolean {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ) // fragment locator
    return !!pattern.test(text)
  }
  private getLinkRequest(text: string, wppNumber:string): MessageRequestLink {
    return {
      type: "link",
      id: wppNumber,
      timestamp: this.getTimestamp(),
      url: text
    }
  }

  private getTimestamp(): Date {
    return new Date()
  }
}
