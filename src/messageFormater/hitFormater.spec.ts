import { MessageResponseHit, HitResult } from "../messageResponse/messageResponseHit"
import { HitFormater } from "./hitFormater"
import { expectedTestHits } from "../__const__/consts"

test("should return hit formatted string response", () => {
  const type = "Hit"

  const messageResponse: MessageResponseHit = {
    type: type,
    hits: expectedTestHits
  }
  const instance = new HitFormater()
  const expected =
    "Encontrei registro(s) sobre esse tema! A seguir separei os mais relevantes: \n\nFato verificado: *É Falso que Cuba desenvolveu vacina contra o coronavírus. Medicamentos cubanos têm sido utilizados para o tratamento de COVID-19 na China, mas não é uma vacina e a substância foi descoberta em outros lugares.*\nVerificado por: *Agência Lupa*\nData da verificação: *13/03/2020*\nLink: https://piaui.folha.uol.com.br/lupa/2020/03/13/verificamos-cuba-vacina-novo-coronavirus/"
  expect(instance.formatMessage(messageResponse)).toStrictEqual(expected)
})

test("should return hit formatted string response without date field", () => {
  const type = "Hit"

  const messageResponse: MessageResponseHit = {
    type: type,
    hits: [
      {
        Checado:
          "É Falso que Cuba desenvolveu vacina contra o coronavírus. Medicamentos cubanos têm sido utilizados para o tratamento de COVID-19 na China, mas não é uma vacina e a substância foi descoberta em outros lugares.",
        Checado_por: "Agência Lupa",
        Data: "",
        Link: "https://piaui.folha.uol.com.br/lupa/2020/03/13/verificamos-cuba-vacina-novo-coronavirus/"
      }
    ]
  }
  const instance = new HitFormater()
  const expected =
    "Encontrei registro(s) sobre esse tema! A seguir separei os mais relevantes: \n\nFato verificado: *É Falso que Cuba desenvolveu vacina contra o coronavírus. Medicamentos cubanos têm sido utilizados para o tratamento de COVID-19 na China, mas não é uma vacina e a substância foi descoberta em outros lugares.*\nVerificado por: *Agência Lupa*\nLink: https://piaui.folha.uol.com.br/lupa/2020/03/13/verificamos-cuba-vacina-novo-coronavirus/"
  expect(instance.formatMessage(messageResponse)).toStrictEqual(expected)
})
