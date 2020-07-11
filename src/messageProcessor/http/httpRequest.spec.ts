import HttpRequest from "./httpRequest"
import Axios from "axios"
import { pythonRequestTestData, expectedTestHits } from "../../__const__/consts"
import { HttpError } from "../http/httpRequest"

const httpRequestInstance = new HttpRequest()

it("get: should return Wpp Fact Check Server", async () => {
  const expected = "Whatsapp Fact Check Server........................"
  //setup
  const spy = jest.spyOn(Axios, "get").mockImplementation((url, data) =>
    Promise.resolve({
      data: expected
    })
  )

  const result = await httpRequestInstance.get("http://dbsamuca.com")
  await expect(result).toStrictEqual(JSON.stringify(expected))
})

it("post: should return json with database response", async () => {
  //setup
  const spy = jest.spyOn(Axios, "post").mockImplementation((url, data) =>
    Promise.resolve({
      data: expectedTestHits
    })
  )

  const result = await httpRequestInstance.post("https://dbsamuca.com", pythonRequestTestData)
  await expect(result).toStrictEqual(JSON.stringify(expectedTestHits))
})

it("post: should call axios with defined url and data", async () => {
  //setup
  const spy = jest.spyOn(Axios, "post").mockImplementation((url, data, config) =>
    Promise.resolve({
      data: expectedTestHits
    })
  )

  await httpRequestInstance.post("https://dbsamuca.com", pythonRequestTestData)
  expect(spy).toHaveBeenCalledWith("https://dbsamuca.com", pythonRequestTestData, { timeout: 10000 }) //teste para testar envio do dado, se o axios recebe da forma correta do outro lado
})

it("post: axios responding with null data should return HttpErrorObject stringified with NullAxiosResponse error field ", async () => {
  //setup
  const expectedObject: HttpError = {
    error: "NullAxiosResponse"
  }

  const spy = jest.spyOn(Axios, "post").mockImplementation((url, data) => Promise.resolve(null))
  const result = await httpRequestInstance.post("https://dbsamuca.com", pythonRequestTestData)

  await expect(result).toEqual(expectedObject)
})

it("post: axios responding with undefined should return HttpErrorObject stringified with UndefinedAxiosResponse error field", async () => {
  //setup

  const expectedObject: HttpError = {
    error: "UndefinedAxiosResponse"
  }
  const spy = jest.spyOn(Axios, "post").mockImplementation((url, data) => Promise.resolve(undefined))
  const result = await httpRequestInstance.post("https://dbsamuca.com", pythonRequestTestData)
  await expect(result).toEqual(expectedObject)
})

it("post: axios responding with unexpected object should return  HttpErrorObject stringified with NoDataField error field", async () => {
  //setup

  const expectedObject: HttpError = {
    error: "NoDataField"
  }
  const spy = jest.spyOn(Axios, "post").mockImplementation((url, data) => Promise.resolve({ nome: "Tom" }))
  const result = await httpRequestInstance.post("https://dbsamuca.com", pythonRequestTestData)
  await expect(result).toEqual(expectedObject)
})
