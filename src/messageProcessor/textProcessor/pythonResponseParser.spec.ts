import { PythonResponseParser } from "../textProcessor/pythonResponseParser"
import { MessageResponse } from "../../messageResponse/messageResponse"
import { MessageResponseHit, HitResult } from "../../messageResponse/messageResponseHit"
import { MessageResponseNoHit } from "../../messageResponse/messageResponseNoHIt"
import { expectedTestHits } from "../../__const__/consts"
import { debuglog } from "util"
import { MessageResponseError } from "../../messageResponse/messageResponseError"

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

it("should receive a null object response from python and return messageResponseError", () => {
  const pythonResponseParserInstance = new PythonResponseParser()

  const hits: any = null
  const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(hits))
  expect((parsedResponse as MessageResponseError).error).toEqual(new Error("NotHitResultArray"))
})

it("should receive a not null object response but different from hitresultarray from python and return messageResponseError", () => {
  const pythonResponseParserInstance = new PythonResponseParser()

  const hits: any = [{ nome: "Tom" }]
  const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(hits))
  expect((parsedResponse as MessageResponseError).error).toEqual(new Error("NotHitResultArray"))
})

it("should receive a undefined object from python and return messageResponseError", () => {
  const pythonResponseParserInstance = new PythonResponseParser()

  const hits: any = undefined
  const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(hits))
  expect((parsedResponse as MessageResponseError).error).toEqual(Error("PythonResponseNotString"))
})
