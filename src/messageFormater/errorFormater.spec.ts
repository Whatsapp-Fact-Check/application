import { ErrorFormater } from "./errorFormater"
import { MessageResponseErrorInternal } from '@/messageResponse/messageResponseError'

test("should return error formatted string response", () => {
  const type = "Error"

  const messageResponse: MessageResponseErrorInternal = {
    type: type,
    errorInternal: {error: new Error("NotHitResultArray")}
  }
  const instance = new ErrorFormater()
  const expected = "Tivemos um erro do tipo: NotHitResultArray\nEntra em contato com a gente se continuar acontecendo!"
  expect(instance.formatMessage(messageResponse)).toStrictEqual(expected)
})
