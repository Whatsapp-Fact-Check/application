import { WppMessageParser, wppMessageBody } from "./wppMessageParser"
import { MessageRequestText } from "@/messageRequest/messageRequestText"
import { MessageRequestLink } from "@/messageRequest/messageRequestLink"
import { MessageRequestImage } from "@/messageRequest/messageRequestImage"
import { MessageRequest } from '@/messageRequest/messageRequest'

test("should return MessageRequestText", () => {
  const instance = new WppMessageParser()
  const message: wppMessageBody = {
    SmsMessageSid: "string",
    NumMedia: "0",
    SmsSid: "string",
    SmsStatus: "string",
    Body: "Coronavirus",
    To: "string",
    NumSegments: "string",
    MessageSid: "string",
    AccountSid: "string",
    From: "whatsapp:+5561999822909",
    ApiVersion: "string"
  }
  const expected: MessageRequestText = {
    type: "text",
    id: "whatsapp:+5561999822909",
    timestamp: new Date(),
    text: "Coronavirus"
  }

  let parsed = instance.parse(message) as MessageRequest
  parsed.timestamp = expected.timestamp
  expect(parsed).toStrictEqual(expected)
})

test("should return MessageRequestLink", () => {
  const instance = new WppMessageParser()
  const message: wppMessageBody = {
    SmsMessageSid: "string",
    NumMedia: "0",
    SmsSid: "string",
    SmsStatus: "string",
    Body: "http://wwww.coronavirus.com.br",
    To: "string",
    NumSegments: "string",
    MessageSid: "string",
    AccountSid: "string",
    From: "whatsapp:+5561999822909",
    ApiVersion: "string"
  }
  const expected: MessageRequestLink = {
    type: "link",
    id: "whatsapp:+5561999822909",
    timestamp: new Date(),
    url: "http://wwww.coronavirus.com.br"
  }

  let parsed = instance.parse(message) as MessageRequest
  parsed.timestamp = expected.timestamp
  expect(parsed).toStrictEqual(expected)
})

test("should return MessageRequestImage", () => {
  const instance = new WppMessageParser()
  const message: wppMessageBody = {
    SmsMessageSid: "string",
    NumMedia: "1",
    MediaUrl0: "http://wwww.twiliocloud.com.br",
    MediaContentType0: "image/jpeg",
    SmsSid: "string",
    SmsStatus: "string",
    Body: "",
    To: "string",
    NumSegments: "string",
    MessageSid: "string",
    AccountSid: "string",
    From: "whatsapp:+5561999822909",
    ApiVersion: "string"
  }
  const expected: MessageRequestImage = {
    type: "image",
    id: "whatsapp:+5561999822909",
    timestamp: new Date(),
    mediaType: "image",
    mediaUrl: "http://wwww.twiliocloud.com.br"
  }

  let parsed = instance.parse(message) as MessageRequest
  parsed.timestamp = expected.timestamp
  expect(parsed).toStrictEqual(expected)
})

test("should throw error for not finding supported media", () => {
  const instance = new WppMessageParser()
  const message: wppMessageBody = {
    SmsMessageSid: "string",
    NumMedia: "1",
    MediaUrl0: "http://wwww.twiliocloud.com.br",
    MediaContentType0: "video/mp4",
    SmsSid: "string",
    SmsStatus: "string",
    Body: "",
    To: "string",
    NumSegments: "string",
    MessageSid: "string",
    AccountSid: "string",
    From: "whatsapp:+5561999822909",
    ApiVersion: "string"
  }

  expect(() => {
    instance.parse(message)
  }).toThrow("Could not create message request: invalid message received (empty text or media type not supported)")
})

test("should throw error for empty message and no media", () => {
  const instance = new WppMessageParser()
  const message: wppMessageBody = {
    SmsMessageSid: "string",
    NumMedia: "0",
    SmsSid: "string",
    SmsStatus: "string",
    Body: "",
    To: "string",
    NumSegments: "string",
    MessageSid: "string",
    AccountSid: "string",
    From: "whatsapp:+5561999822909",
    ApiVersion: "string"
  }

  expect(() => {
    instance.parse(message)
  }).toThrow("Could not create message request: invalid message received (empty text or media type not supported)")
})


test("should throw error for wrong messageBody", () => {
  const instance = new WppMessageParser()
  const message: any = {
    SmsMessageSid: "string",
  }

  expect(() => {
    instance.parse(message)
  }).toThrow()
})
