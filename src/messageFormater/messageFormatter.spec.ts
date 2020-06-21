import { MessageResponse } from "@/messageResponse/messageResponse"
import { MessageFormater } from "."
import { MessageResponseHit, HitResult } from "../messageResponse/messageResponseHit"
import { MessageResponseError } from "../messageResponse/messageResponseError"
import { expectedTestHits } from "../__const__/consts"

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

  const messageResponse: MessageResponseHit = {
    type: type,
    hits: expectedTestHits
  }
  const instance = new MessageFormater()
  const expected =
    "Encontrei 1 registro(s) sobre esse tema! A seguir separei os mais relevantes: \nFato verificado: É Falso que Cuba desenvolveu vacina contra o coronavírus. Medicamentos cubanos têm sido utilizados para o tratamento de COVID-19 na China, mas não é uma vacina e a substância foi descoberta em outros lugares.\nVerificado por Agência Lupa\nLink: https://piaui.folha.uol.com.br/lupa/2020/03/13/verificamos-cuba-vacina-novo-coronavirus/ "
  expect(instance.formatMessage(messageResponse)).toStrictEqual(expected)
})

test("should return error formatted string response", () => {
  const type = "Error"

  const messageResponse: MessageResponseError = {
    type: type,
    errorType: "internal",
    error: new Error("NotHitResultArray")
  }
  const instance = new MessageFormater()
  const expected = "Tivemos um erro do tipo: NotHitResultArray\nEntra em contato com a gente se continuar acontecendo!"
  expect(instance.formatMessage(messageResponse)).toStrictEqual(expected)
})
