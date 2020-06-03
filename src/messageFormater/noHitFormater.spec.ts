import { NoHitFormater } from "./noHitFormater"
import { MessageResponseNoHit } from "../messageResponse/messageResponseNoHIt"

test("should return no hit formatted string response", () => {
  const type = "NoHit"
  const instance = new NoHitFormater()
  const expected = "Infelizmente não conseguimos localizar nenhuma checagem relacionada com a frase enviada. "
  const messageResponse: MessageResponseNoHit = {
    type: type
  }
  expect(instance.formatMessage(messageResponse)).toStrictEqual(expected)
})
