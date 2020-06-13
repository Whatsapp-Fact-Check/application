import HttpRequest from "./httpRequest"
import Axios from "axios"
import { pythonRequestTestData, expectedTestHits } from "../../__const__/consts"
import { HttpError } from "../http/httpRequest"

const httpRequestInstance = new HttpRequest()

it("should return json with database response", async () => {
  //setup
  const spy = jest.spyOn(Axios, "post").mockImplementation((url, data) =>
    Promise.resolve({
      data: expectedTestHits
    })
  )

  const result = await httpRequestInstance.post("https://dbsamuca.com", pythonRequestTestData, 2)
  await expect(result).toStrictEqual(JSON.stringify(expectedTestHits))
})

it("should call axios with defined url and data", async () => {
  //setup
  const spy = jest.spyOn(Axios, "post").mockImplementation((url, data, config) =>
    Promise.resolve({
      data: expectedTestHits
    })
  )

  await httpRequestInstance.post("https://dbsamuca.com", pythonRequestTestData, 2)
  expect(spy).toHaveBeenCalledWith("https://dbsamuca.com", pythonRequestTestData, { timeout: 2 }) //teste para testar envio do dado, se o axios recebe da forma correta do outro lado
})

it("axios responding with null data should return HttpErrorObject stringified with NullAxiosResponse error field ", async () => {
  //setup
  const expectedObject: HttpError = {
    error: "NullAxiosResponse"
  }

  const spy = jest.spyOn(Axios, "post").mockImplementation((url, data) => Promise.resolve(null))
  const result = await httpRequestInstance.post("https://dbsamuca.com", pythonRequestTestData, 2)

  await expect(result).toEqual(JSON.stringify(expectedObject))
})

it("axios responding with undefined should return HttpErrorObject stringified with UndefinedAxiosResponse error field", async () => {
  //setup

  const expectedObject: HttpError = {
    error: "UndefinedAxiosResponse"
  }
  const spy = jest.spyOn(Axios, "post").mockImplementation((url, data) => Promise.resolve(undefined))
  const result = await httpRequestInstance.post("https://dbsamuca.com", pythonRequestTestData, 2)
  await expect(result).toEqual(JSON.stringify(expectedObject))
})

it("axios responding with unexpected object should return  HttpErrorObject stringified with NoDataField error field", async () => {
  //setup

  const expectedObject: HttpError = {
    error: "NoDataField"
  }
  const spy = jest.spyOn(Axios, "post").mockImplementation((url, data) => Promise.resolve({ nome: "Tom" }))
  const result = await httpRequestInstance.post("https://dbsamuca.com", pythonRequestTestData, 2)
  await expect(result).toEqual(JSON.stringify(expectedObject))
})
