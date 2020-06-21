import { wppMessageBody } from "./wppMessageParser"
import { MessageRequestText } from "@/messageRequest/messageRequestText"
import { MessageParser } from '.'
import { MessageRequest } from '@/messageRequest/messageRequest'

test("should return MessageRequestText", () => {
  const instance = new MessageParser()
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

  let parsed = instance.parse("wpp", message) as MessageRequest
  parsed.timestamp = expected.timestamp
  expect(parsed).toStrictEqual(expected)
})

test("should throw error for wrong parser type", () => {
  const instance = new MessageParser()
  const message: wppMessageBody = {
    SmsMessageSid: "string",
    NumMedia: "0",
    SmsSid: "string",
    SmsStatus: "string",
    Body: "Corona",
    To: "string",
    NumSegments: "string",
    MessageSid: "string",
    AccountSid: "string",
    From: "whatsapp:+5561999822909",
    ApiVersion: "string"
  }

  expect(() => {
    instance.parse("facebook", message)
  }).toThrow()
})
