import axios from "axios"

export interface PythonRequest {
  text: string
}
export default class HttpRequest {
  constructor() {}

  public async post(url: string, data: PythonRequest): Promise<string> {
    const response = await axios.post(url, data)

    return JSON.stringify(response.data)
  }
}
