import { MessageRequest } from "../../messageRequest/messageRequest"
import { MessageResponseHit, HitResult } from "../../messageResponse/messageResponseHit"
import { MessageTextProcessor } from "../../messageProcessor/textProcessor/messageTextProcessor"
import { PythonRequest } from "../http/httpRequest"
import { MessageResponse } from "../../messageResponse/messageResponse"
import Axios from "axios"
const data: PythonRequest = {
  text: "bolsonaro fake news"
}
it("should receive a messageRequest and return a messageResponse", async () => {
  //setup
  const spy = jest.spyOn(Axios, "post").mockImplementation((url, data) =>
    Promise.resolve({
      data: [
        {
          checado:
            "É Falso que Cuba desenvolveu vacina contra o coronavírus. Medicamentos cubanos têm sido utilizados para o tratamento de COVID-19 na China, mas não é uma vacina e a substância foi descoberta em outros lugares.",
          checado_por: "Agência Lupa",
          data: "13/03/2020",
          link: "https://piaui.folha.uol.com.br/lupa/2020/03/13/verificamos-cuba-vacina-novo-coronavirus/"
        }
      ]
    })
  )

  const message = "bolsonaro fake news"
  const messageRequest: MessageRequest = {
    text: message
  }

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

  const messageTextProcessor = new MessageTextProcessor()
  const processedMessage = await messageTextProcessor.processMessage(messageRequest)
  console.log("processedMessage " + JSON.stringify(processedMessage))
  await expect(expectedMessageResponse as MessageResponse).toEqual(processedMessage)
  expect(spy).toHaveBeenCalledWith("https://dbsamuca.com", data)
})
