import { WppMessageParser } from "./wppMessageParser"
import { MessageRequest } from "./messageRequest"
test("should return text MessageRequest", () => {
  const message = "Tomar alvejante mata o Corona Vírus"
  const instance = new WppMessageParser()
  const expected: MessageRequest = {
    text: message
  }
  expect(instance.parse(message)).toStrictEqual(expected)
})
