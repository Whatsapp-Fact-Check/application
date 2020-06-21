import { MessageResponseError } from "../messageResponse/messageResponseError"
import { ErrorFormater } from "./errorFormater"

test("should return error formatted string response", () => {
  const type = "Error"

  const messageResponse: MessageResponseError = {
    type: type,
    errorType: "internal",
    error: new Error("NotHitResultArray")
  }
  const instance = new ErrorFormater()
  const expected = "Tivemos um erro do tipo: NotHitResultArray\nEntra em contato com a gente se continuar acontecendo!"
  expect(instance.formatMessage(messageResponse)).toStrictEqual(expected)
})
