import { ErrorFormater } from "./errorFormater"
import { MessageResponseErrorInternal, MessageResponseErrorToNotifyUser } from "@/messageResponse/messageResponseError"
import { error } from "console"

test("should return internal error string response", () => {
  const type = "Error"

  const messageResponse: MessageResponseErrorInternal = {
    type: type,
    errorType: "internal",
    error: new Error("NotHitResultArray")
  }
  const instance = new ErrorFormater()
  const expected = "Encontramos um problema interno ao processar sua requisição, estamos trabalhando para corrigir 👨‍💻"
  expect(instance.formatMessage(messageResponse)).toStrictEqual(expected)
})

test("should return to notify error string response", () => {
  const type = "Error"

  const messageResponse: MessageResponseErrorToNotifyUser = {
    type: type,
    errorToNotifyUser: { error: new Error("Unsuported Media Type"), errorType: "unsupportedMedia" }
  }
  const instance = new ErrorFormater()
  const expected =
    "Ainda não suportamos imagem/vídeo/audio/link. Nos envie um texto curto descrevendo o fato que você quer checar!"
  expect(instance.formatMessage(messageResponse)).toStrictEqual(expected)
})
