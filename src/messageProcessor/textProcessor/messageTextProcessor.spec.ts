import { MessageRequest } from "../../messageRequest/messageRequest"
import { MessageResponseHit, HitResult } from "../../messageResponse/messageResponseHit"
import { MessageTextProcessor } from "../../messageProcessor/textProcessor/messageTextProcessor"
import { MessageResponse } from "../../messageResponse/messageResponse"
import Axios from "axios"
import { pythonRequestTestData, expectedTestHits, expectedThreeTestHits } from "../../__const__/consts"

it("should receive a messageRequest and return a messageResponse", async () => {
  //setup
  const spy = jest.spyOn(Axios, "post").mockImplementation((url, data) =>
    Promise.resolve({
      data: expectedTestHits
    })
  )

  const message = "bolsonaro fake news"
  const messageRequest: MessageRequest = {
    text: message
  }

  const type = "Hit"

  const expectedMessageResponse: MessageResponseHit = {
    type: type,
    hits: expectedTestHits
  }

  const messageTextProcessor = new MessageTextProcessor()
  const processedMessage = await messageTextProcessor.processMessage(messageRequest)
  console.log("processedMessage " + JSON.stringify(processedMessage))
  await expect(expectedMessageResponse as MessageResponse).toEqual(processedMessage)
})

it("should receive 3 messageRequests and return 3 messageResponses", async () => {
  //setup
  const spy = jest.spyOn(Axios, "post").mockImplementation((url, data) =>
    Promise.resolve({
      data: expectedThreeTestHits
    })
  )

  const message = "bolsonaro fake news"
  const messageRequest: MessageRequest = {
    text: message
  }

  const type = "Hit"

  const expectedMessageResponse: MessageResponseHit = {
    type: type,
    hits: expectedThreeTestHits
  }

  const messageTextProcessor = new MessageTextProcessor()
  const processedMessage = await messageTextProcessor.processMessage(messageRequest)
  console.log("processedMessage " + JSON.stringify(processedMessage))
  await expect(expectedMessageResponse as MessageResponse).toEqual(processedMessage)
})
