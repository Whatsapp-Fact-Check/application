import axios from "axios"

export interface PythonRequest {
  text: string
}
export default class HttpRequest {
  constructor() {}

  public async post(url: string, data: PythonRequest): Promise<string> {
    const response = await axios.post(url, data)

    if (response != null) {
      if (response != undefined) {
        if ("data" in response) {
          return JSON.stringify(response.data)
        } else {
          throw new Error("NoDataField")
        }
      } else {
        throw new Error("UndefinedAxiosResponse")
      }
    } else {
      throw new Error("NullAxiosResponse")
    }
  }
}
