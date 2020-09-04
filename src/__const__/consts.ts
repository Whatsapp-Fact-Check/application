import { DataBaseRequest } from "../messageProcessor/textProcessor/messageTextProcessor"
import { HitResult } from "@/messageResponse/messageResponseHit"

export const pythonRequestTestData: DataBaseRequest = {
  text: "bolsonaro fake news"
}
export const expectedTestHits: Array<HitResult> = [
  {
    Checado:
      "É Falso que Cuba desenvolveu vacina contra o coronavírus. Medicamentos cubanos têm sido utilizados para o tratamento de COVID-19 na China, mas não é uma vacina e a substância foi descoberta em outros lugares.",
    Checado_por: "Agência Lupa",
    Data: "13/03/2020",
    Link: "https://piaui.folha.uol.com.br/lupa/2020/03/13/verificamos-cuba-vacina-novo-coronavirus/"
  }
]

export const expectedThreeTestHits: Array<HitResult> = [
  {
    Checado:
      "É Falso que Cuba desenvolveu vacina contra o coronavírus. Medicamentos cubanos têm sido utilizados para o tratamento de COVID-19 na China, mas não é uma vacina e a substância foi descoberta em outros lugares.",
    Checado_por: "Agência Lupa",
    Data: "13/03/2020",
    Link: "https://piaui.folha.uol.com.br/lupa/2020/03/13/verificamos-cuba-vacina-novo-coronavirus/"
  },
  {
    Checado:
      "É Falso que Cuba desenvolveu vacina contra o coronavírus. Medicamentos cubanos têm sido utilizados para o tratamento de COVID-19 na China, mas não é uma vacina e a substância foi descoberta em outros lugares.",
    Checado_por: "Agência Lupa",
    Data: "13/03/2020",
    Link: "https://piaui.folha.uol.com.br/lupa/2020/03/13/verificamos-cuba-vacina-novo-coronavirus/"
  },
  {
    Checado:
      "É Falso que Cuba desenvolveu vacina contra o coronavírus. Medicamentos cubanos têm sido utilizados para o tratamento de COVID-19 na China, mas não é uma vacina e a substância foi descoberta em outros lugares.",
    Checado_por: "Agência Lupa",
    Data: "13/03/2020",
    Link: "https://piaui.folha.uol.com.br/lupa/2020/03/13/verificamos-cuba-vacina-novo-coronavirus/"
  }
]
