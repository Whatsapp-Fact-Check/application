import axios, { AxiosResponse } from "axios"
import { FakeNewsDataBaseRequest } from "../textProcessor/messageTextProcessor"

export interface HttpError {
  error: string
}

export type HttpData = FakeNewsDataBaseRequest

export default class HttpRequest {
  public async post(url: string, data: HttpData): Promise<string | HttpError> {
    try {
      const result = await axios.post(url, data, { timeout: 10000 })
      return this.responseParser(result)
    } catch (err) {
      return this.createHttpError(err.message)
    }

    //still have to set timeout as a global constant
  }

  private responseParser(response: AxiosResponse<any>): string | HttpError {
    let httpErrorObject: HttpError
    if (response !== null) {
      if (response !== undefined) {
        if ("data" in response) {
          return JSON.stringify(response.data)
        } else {
          httpErrorObject = this.createHttpError("NoDataField")
          return httpErrorObject
        }
      } else {
        httpErrorObject = this.createHttpError("UndefinedAxiosResponse")
        return httpErrorObject
      }
    } else {
      httpErrorObject = this.createHttpError("NullAxiosResponse")
      return httpErrorObject
    }
  }

  private createHttpError(error: string): HttpError {
    const messageHttpError: HttpError = {
      error: error
    }
    return messageHttpError
  }
}
