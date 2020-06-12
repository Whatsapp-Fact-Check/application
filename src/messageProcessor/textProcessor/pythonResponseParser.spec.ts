import { PythonResponseParser } from "../textProcessor/pythonResponseParser"
import { MessageResponse } from "../../messageResponse/messageResponse"
import { MessageResponseHit, HitResult } from "../../messageResponse/messageResponseHit"
import { MessageResponseNoHit } from "../../messageResponse/messageResponseNoHIt"
import { expectedTestHits } from "../../__const__/consts"
import { debuglog } from "util"

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

it("should receive a null object response from python and throw error", () => {
  const pythonResponseParserInstance = new PythonResponseParser()

  const hits: any = null
  try {
    const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(hits))
  } catch (e) {
    expect(e).toEqual(Error("NotHitResultArray"))
  }
})

it("should receive a not null object response but different from hitresultarray from python and throw error", () => {
  const pythonResponseParserInstance = new PythonResponseParser()

  const hits: any = [{ nome: "Tom" }]
  try {
    const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(hits))
  } catch (e) {
    expect(e).toEqual(Error("NotHitResultArray"))
  }
})

it("should receive a undefined object from python and throw error", () => {
  const pythonResponseParserInstance = new PythonResponseParser()

  const hits: any = undefined
  try {
    const parsedResponse = pythonResponseParserInstance.parseMessage(JSON.stringify(hits))
  } catch (e) {
    expect(e).toEqual(Error("PythonResponseNotString"))
  }
})
