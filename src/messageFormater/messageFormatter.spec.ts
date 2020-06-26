import { MessageResponse } from "@/messageResponse/messageResponse"
import { MessageFormater } from "."
import { MessageResponseHit, HitResult } from "../messageResponse/messageResponseHit"
import { expectedTestHits } from "../__const__/consts"
import { MessageResponseErrorInternal } from "@/messageResponse/messageResponseError"

test("should return no hit formatted string response", () => {
  const type = "NoHit"
  const instance = new MessageFormater()
  const expected =
    "Não encontramos nada correspondente 😓\n\n" +
    "Tente mandar de novo mudando um pouco a frase, usando sinônimos... Pode ser que isso ajude a gente a encontrar!"
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
    "Encontrei registro(s) sobre esse tema! A seguir separei os mais relevantes: \n\nFato verificado: *É Falso que Cuba desenvolveu vacina contra o coronavírus. Medicamentos cubanos têm sido utilizados para o tratamento de COVID-19 na China, mas não é uma vacina e a substância foi descoberta em outros lugares.*\nVerificado por: *Agência Lupa*\nData da verificação: *13/03/2020*\nLink: https://piaui.folha.uol.com.br/lupa/2020/03/13/verificamos-cuba-vacina-novo-coronavirus/"
  expect(instance.formatMessage(messageResponse)).toStrictEqual(expected)
})

test("should return internal error formatted string response", () => {
  const type = "Error"

  const messageResponse: MessageResponseErrorInternal = {
    type: type,
    errorInternal: { error: new Error("NotHitResultArray") }
  }
  const instance = new MessageFormater()
  const expected = "Encontramos um problema interno ao processar sua requisição, estamos trabalhando para corrigir 👨‍💻"
  expect(instance.formatMessage(messageResponse)).toStrictEqual(expected)
})
