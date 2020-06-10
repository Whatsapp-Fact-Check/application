import { PythonResponseParser } from "../textProcessor/pythonResponseParser"
import { MessageResponse } from "../../messageResponse/messageResponse"
import { MessageResponseHit, HitResult } from "../../messageResponse/messageResponseHit"
import { MessageResponseNoHit } from "../../messageResponse/messageResponseNoHIt"

it("should receive a hit response from python and instantiate messageresponsehit", () => {
  const pythonResponseParserInstance = new PythonResponseParser()

  const type = "Hit"
  const hits: Array<HitResult> = [
    {
      checado:
        "É Falso que Cuba desenvolveu vacina contra o coronavírus. Medicamentos cubanos têm sido utilizados para o tratamento de COVID-19 na China, mas não é uma vacina e a substância foi descoberta em outros lugares.",
      checado_por: "Agência Lupa",
      data: "13/03/2020",
      link: "https://piaui.folha.uol.com.br/lupa/2020/03/13/verificamos-cuba-vacina-novo-coronavirus/"
    }
  ]

  const expectedMessageResponse: MessageResponseHit = {
    type: type,
    hits: hits
  }

  const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(hits))
  expect(parsedResponse).toEqual(expectedMessageResponse as MessageResponse)
})

it("should receive a nohit response from python and instantiate messageresponsenohit", () => {
  const pythonResponseParserInstance = new PythonResponseParser()

  const expectedMessageResponse: MessageResponseNoHit = {
    type: "NoHit"
  }

  const hits: Array<HitResult> = []

  const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(hits))
  expect(parsedResponse).toEqual(expectedMessageResponse as MessageResponse)
})
