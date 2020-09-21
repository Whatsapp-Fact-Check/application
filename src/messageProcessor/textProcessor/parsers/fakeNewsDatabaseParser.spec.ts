import { FakeNewsDatabaseParser } from "./fakeNewsDatabaseParser"
import { MessageResponse } from "../../../messageResponse/messageResponse"
import { MessageResponseHit, HitResult } from "../../../messageResponse/messageResponseHit"
import { MessageResponseNoHit } from "../../../messageResponse/messageResponseNoHIt"
import { expectedTestHits } from "../../../__const__/consts"
import { HttpError } from "../../http/httpRequest"
import { MessageResponseErrorInternal } from '@/messageResponse/messageResponseError'

it("should receive a hit response from python and instantiate messageresponsehit", () => {
  const pythonResponseParserInstance = new FakeNewsDatabaseParser()

  const type = "Hit"

  const expectedMessageResponse: MessageResponseHit = {
    type: type,
    hits: expectedTestHits
  }

  const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(expectedTestHits))
  expect(parsedResponse).toEqual(expectedMessageResponse as MessageResponse)
})

it("should receive a nohit response from python and instantiate messageresponsenohit", () => {
  const pythonResponseParserInstance = new FakeNewsDatabaseParser()

  const expectedMessageResponse: MessageResponseNoHit = {
    type: "NoHit"
  }

  const hits: Array<HitResult> = []

  const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(hits))
  expect(parsedResponse).toEqual(expectedMessageResponse as MessageResponse)
})

it("should receive a null object response from python and return UnknownTypePythonResponse messageResponseError", () => {
  const pythonResponseParserInstance = new FakeNewsDatabaseParser()

  const hits: any = null
  const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(hits))
  expect((parsedResponse as MessageResponseErrorInternal).errorInternal.error).toEqual(new Error("UnknownTypePythonResponse"))
})

it("should receive a not null object response but different from hitresultarray from python and return UnknownTypePythonResponse messageResponseError", () => {
  const pythonResponseParserInstance = new FakeNewsDatabaseParser()

  const hits: any = [{ nome: "Tom" }]
  const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(hits))
  expect((parsedResponse as MessageResponseErrorInternal).errorInternal.error).toEqual(new Error("UnknownTypePythonResponse"))
})

it("should receive a undefined object from python and return NotJsonStructure messageResponseError", () => {
  const pythonResponseParserInstance = new FakeNewsDatabaseParser()

  const hits: any = undefined
  const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(hits))
  expect((parsedResponse as MessageResponseErrorInternal).errorInternal.error).toEqual(Error("NotJsonStructure"))
})

it("should receive a httperror UndefinedAxiosResponse object from python and return UndefinedAxiosResponse messageResponseError", () => {
  const pythonResponseParserInstance = new FakeNewsDatabaseParser()

  const httpError: HttpError = {
    error: "UndefinedAxiosResponse"
  }
  const parsedResponse = pythonResponseParserInstance.parseMessage(httpError)
  expect((parsedResponse as MessageResponseErrorInternal).errorInternal.error).toEqual(Error("UndefinedAxiosResponse"))
})

it("should receive a httperror NoDataField object from python and return NoDataField messageResponseError", () => {
  const pythonResponseParserInstance = new FakeNewsDatabaseParser()

  const httpError: HttpError = {
    error: "NoDataField"
  }
  const parsedResponse = pythonResponseParserInstance.parseMessage(httpError)
  expect((parsedResponse as MessageResponseErrorInternal).errorInternal.error).toEqual(Error("NoDataField"))
})

it("should receive a httperror NullAxiosResponse object from python and return NullAxiosResponse messageResponseError", () => {
  const pythonResponseParserInstance = new FakeNewsDatabaseParser()

  const httpError: HttpError = {
    error: "NullAxiosResponse"
  }
  const parsedResponse = pythonResponseParserInstance.parseMessage(httpError)
  expect((parsedResponse as MessageResponseErrorInternal).errorInternal.error).toEqual(Error("NullAxiosResponse"))
})
