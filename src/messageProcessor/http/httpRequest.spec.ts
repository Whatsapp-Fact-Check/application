import HttpRequest from "./httpRequest"
import Axios from "axios"
import { pythonRequestTestData, expectedTestHits } from "../../__const__/consts"

const httpRequestInstance = new HttpRequest()

it("should return json with database response", async () => {
  //setup
  const spy = jest.spyOn(Axios, "post").mockImplementation((url, data) =>
    Promise.resolve({
      data: expectedTestHits
    })
  )

  const result = await httpRequestInstance.post("https://dbsamuca.com", pythonRequestTestData)
  await expect(result).toStrictEqual(JSON.stringify(expectedTestHits))
})

it("should call axios with defined url and data", async () => {
  //setup
  const spy = jest.spyOn(Axios, "post").mockImplementation((url, data) =>
    Promise.resolve({
      data: expectedTestHits
    })
  )

  await httpRequestInstance.post("https://dbsamuca.com", pythonRequestTestData)
  expect(spy).toHaveBeenCalledWith("https://dbsamuca.com", pythonRequestTestData) //teste para testar envio do dado, se o axios recebe da forma correta do outro lado
})

it("axios responding with null data should throw error", async () => {
  //setup
  const spy = jest.spyOn(Axios, "post").mockImplementation((url, data) => Promise.resolve(null))
  try {
    const result = await httpRequestInstance.post("https://dbsamuca.com", pythonRequestTestData)
  } catch (e) {
    await expect(e).toEqual(new Error("NullAxiosResponse"))
  }
})

it("axios responding with undefined error should throw error", async () => {
  //setup
  const spy = jest.spyOn(Axios, "post").mockImplementation((url, data) => Promise.resolve(null))
  try {
    const result = await httpRequestInstance.post("https://dbsamuca.com", pythonRequestTestData)
  } catch (e) {
    await expect(e).toEqual(new Error("NullAxiosResponse"))
  }
})

it("axios responding with unexpected object should throw error", async () => {
  //setup
  const spy = jest.spyOn(Axios, "post").mockImplementation((url, data) => Promise.resolve({ nome: "Tom" }))
  try {
    const result = await httpRequestInstance.post("https://dbsamuca.com", pythonRequestTestData)
  } catch (e) {
    expect(e).toEqual(new Error("NoDataField"))
  }
})
