import { PythonRequest } from "@/messageProcessor/http/httpRequest"
import { HitResult } from "@/messageResponse/messageResponseHit"

export const pythonRequestTestData: PythonRequest = {
  text: "bolsonaro fake news"
}
export const expectedTestHits: Array<HitResult> = [
  {
    checado:
      "É Falso que Cuba desenvolveu vacina contra o coronavírus. Medicamentos cubanos têm sido utilizados para o tratamento de COVID-19 na China, mas não é uma vacina e a substância foi descoberta em outros lugares.",
    checado_por: "Agência Lupa",
    data: "13/03/2020",
    link: "https://piaui.folha.uol.com.br/lupa/2020/03/13/verificamos-cuba-vacina-novo-coronavirus/"
  }
]

export const expectedThreeTestHits: Array<HitResult> = [
  {
    checado:
      "É Falso que Cuba desenvolveu vacina contra o coronavírus. Medicamentos cubanos têm sido utilizados para o tratamento de COVID-19 na China, mas não é uma vacina e a substância foi descoberta em outros lugares.",
    checado_por: "Agência Lupa",
    data: "13/03/2020",
    link: "https://piaui.folha.uol.com.br/lupa/2020/03/13/verificamos-cuba-vacina-novo-coronavirus/"
  },
  {
    checado:
      "É Falso que Cuba desenvolveu vacina contra o coronavírus. Medicamentos cubanos têm sido utilizados para o tratamento de COVID-19 na China, mas não é uma vacina e a substância foi descoberta em outros lugares.",
    checado_por: "Agência Lupa",
    data: "13/03/2020",
    link: "https://piaui.folha.uol.com.br/lupa/2020/03/13/verificamos-cuba-vacina-novo-coronavirus/"
  },
  {
    checado:
      "É Falso que Cuba desenvolveu vacina contra o coronavírus. Medicamentos cubanos têm sido utilizados para o tratamento de COVID-19 na China, mas não é uma vacina e a substância foi descoberta em outros lugares.",
    checado_por: "Agência Lupa",
    data: "13/03/2020",
    link: "https://piaui.folha.uol.com.br/lupa/2020/03/13/verificamos-cuba-vacina-novo-coronavirus/"
  }
]
