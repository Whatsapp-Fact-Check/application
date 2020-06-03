import { MessageResponse } from "@/messageResponse/messageResponse"
import { MessageFormater } from "."
import { MessageResponseHit, HitResult } from "../messageResponse/messageResponseHit"

test("should return no hit formatted string response", () => {
  const type = "NoHit"
  const instance = new MessageFormater()
  const expected = "Infelizmente não conseguimos localizar nenhuma checagem relacionada com a frase enviada. "
  const messageResponse: MessageResponse = {
    type: type
  }
  expect(instance.formatMessage(messageResponse)).toStrictEqual(expected)
})

test("should return hit formatted string response", () => {
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

  const messageResponse: MessageResponseHit = {
    type: type,
    hits: hits
  }
  const instance = new MessageFormater()
  const expected =
    "Encontrei 1 registro(s) sobre esse tema! A seguir separei os mais relevantes: \nFato verificado: É Falso que Cuba desenvolveu vacina contra o coronavírus. Medicamentos cubanos têm sido utilizados para o tratamento de COVID-19 na China, mas não é uma vacina e a substância foi descoberta em outros lugares.\nVerificado por Agência Lupa\nLink: https://piaui.folha.uol.com.br/lupa/2020/03/13/verificamos-cuba-vacina-novo-coronavirus/ "
  expect(instance.formatMessage(messageResponse)).toStrictEqual(expected)
})
