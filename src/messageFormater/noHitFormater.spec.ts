import { NoHitFormater } from "./noHitFormater"
import { MessageResponseNoHit } from "../messageResponse/messageResponseNoHIt"

test("should return no hit formatted string response", () => {
  const type = "NoHit"
  const instance = new NoHitFormater()
  const expected = "Não encontramos nada correspondente 😓\n\n" +
  "Tente mandar de novo mudando um pouco a frase, usando sinônimos... Pode ser que isso ajude a gente a encontrar!"
  const messageResponse: MessageResponseNoHit = {
    type: type
  }
  expect(instance.formatMessage(messageResponse)).toStrictEqual(expected)
})
