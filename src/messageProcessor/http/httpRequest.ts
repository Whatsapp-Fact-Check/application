import axios from "axios"

export class HttpRequest {
  public async post(url: string, data: any): Promise<string> {
    const response = await axios.post(url, data)

    return response.data
  }
}
//como deixar type protected?
