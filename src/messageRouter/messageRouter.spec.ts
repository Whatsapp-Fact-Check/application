import { MessageRouter } from "./messageRouter"
import { ErrorInternal } from "@/error/errorInternal"
import { ErrorToNotifyUser } from "@/error/errorToNotifyUser"
import { MessageRequestText } from "@/messageRequest/messageRequestText"

const expectedNotifiableError = "Ainda não suportamos imagem/vídeo/audio/link. Nos envie um texto curto descrevendo o fato que você quer checar!"
const expectedInternalError = "Encontramos um problema interno ao processar sua requisição, estamos trabalhando para corrigir 👨‍💻"

test("should return formatted messageResponse", async () => {
  const instance = new MessageRouter()
  let message: MessageRequestText = {
    type: "text",
    id: "whatsapp:+5561999822909",
    timestamp: new Date(),
    text: "Jair bolsonaro"
  }
  let result = await instance.processMessage(message)
  let assertion = (result != expectedNotifiableError) && (result != expectedInternalError)
  expect(assertion).toBe(true)
})

test("should return internal error formatted message", async () => {
  const instance = new MessageRouter()
  const expected = expectedInternalError
  let message: ErrorInternal = {
    error: new Error("Internal")
  }
  let result = await instance.processMessage(message)
  expect(result).toStrictEqual(expected)
})

test("should return errorToNotifyUser formatted message", async () => {
  const instance = new MessageRouter()
  const expected = expectedNotifiableError    
  let message: ErrorToNotifyUser = {
    error: new Error("invalid Media"),
    errorType: "unsupportedMedia"
  }
  let result = await instance.processMessage(message)
  expect(result).toStrictEqual(expected)
})
