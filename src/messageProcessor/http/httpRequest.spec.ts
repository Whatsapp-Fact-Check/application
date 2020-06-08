import { HttpRequest } from "../http/httpRequest"
import { HitResult } from "../../messageResponse/messageResponseHit"

it("should return json with database response", async () => {
  //setup
  const httpRequestInstance = new HttpRequest()

  const data = {
    data: {
      text: "bolsonaro fake news"
    }
  }
  const expectedHits: Array<HitResult> = [
    {
      checado:
        "É Falso que Cuba desenvolveu vacina contra o coronavírus. Medicamentos cubanos têm sido utilizados para o tratamento de COVID-19 na China, mas não é uma vacina e a substância foi descoberta em outros lugares.",
      checado_por: "Agência Lupa",
      data: "13/03/2020",
      link: "https://piaui.folha.uol.com.br/lupa/2020/03/13/verificamos-cuba-vacina-novo-coronavirus/"
    }
  ]
  const result = await httpRequestInstance.post("https://dbsamuca.com", data)

  await expect(result).toEqual(expectedHits)
})
