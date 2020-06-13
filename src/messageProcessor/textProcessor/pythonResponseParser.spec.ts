import { PythonResponseParser } from "../textProcessor/pythonResponseParser"
import { MessageResponse } from "../../messageResponse/messageResponse"
import { MessageResponseHit, HitResult } from "../../messageResponse/messageResponseHit"
import { MessageResponseNoHit } from "../../messageResponse/messageResponseNoHIt"
import { expectedTestHits } from "../../__const__/consts"
import { debuglog } from "util"
import { MessageResponseError } from "../../messageResponse/messageResponseError"
import { HttpError } from "../http/httpRequest"

it("should receive a hit response from python and instantiate messageresponsehit", () => {
  const pythonResponseParserInstance = new PythonResponseParser()

  const type = "Hit"

  const expectedMessageResponse: MessageResponseHit = {
    type: type,
    hits: expectedTestHits
  }

  const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(expectedTestHits))
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

it("should receive a null object response from python and return UnknownTypePythonResponse messageResponseError", () => {
  const pythonResponseParserInstance = new PythonResponseParser()

  const hits: any = null
  const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(hits))
  expect((parsedResponse as MessageResponseError).error).toEqual(new Error("UnknownTypePythonResponse"))
})

it("should receive a not null object response but different from hitresultarray from python and return UnknownTypePythonResponse messageResponseError", () => {
  const pythonResponseParserInstance = new PythonResponseParser()

  const hits: any = [{ nome: "Tom" }]
  const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(hits))
  expect((parsedResponse as MessageResponseError).error).toEqual(new Error("UnknownTypePythonResponse"))
})

it("should receive a undefined object from python and return PythonResponseNotString messageResponseError", () => {
  const pythonResponseParserInstance = new PythonResponseParser()

  const hits: any = undefined
  const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(hits))
  expect((parsedResponse as MessageResponseError).error).toEqual(Error("PythonResponseNotString"))
})

it("should receive a httperror UndefinedAxiosResponse object from python and return UndefinedAxiosResponse messageResponseError", () => {
  const pythonResponseParserInstance = new PythonResponseParser()

  const httpError: HttpError = {
    error: "UndefinedAxiosResponse"
  }
  const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(httpError))
  expect((parsedResponse as MessageResponseError).error).toEqual(Error("UndefinedAxiosResponse"))
})

it("should receive a httperror NoDataField object from python and return NoDataField messageResponseError", () => {
  const pythonResponseParserInstance = new PythonResponseParser()

  const httpError: HttpError = {
    error: "NoDataField"
  }
  const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(httpError))
  expect((parsedResponse as MessageResponseError).error).toEqual(Error("NoDataField"))
})

it("should receive a httperror NullAxiosResponse object from python and return NullAxiosResponse messageResponseError", () => {
  const pythonResponseParserInstance = new PythonResponseParser()

  const httpError: HttpError = {
    error: "NullAxiosResponse"
  }
  const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(httpError))
  expect((parsedResponse as MessageResponseError).error).toEqual(Error("NullAxiosResponse"))
})
