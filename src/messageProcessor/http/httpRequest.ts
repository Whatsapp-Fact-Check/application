import { ErrorInternal } from '@/error/errorInternal'
import axios, { AxiosResponse } from "axios"

type jsonString = string
export type httpResponseOrError = jsonString | ErrorInternal

export default class HttpRequest {
  private requestTimeout: number = 5000

  public async post(url: string, data: any): Promise<httpResponseOrError> {
    try {
      const encodedUrl = encodeURI(url)
      const result = await axios.post(encodedUrl, data, { timeout: this.requestTimeout })
      return this.responseParser(result)
    } catch (err) {
      return this.createHttpError(err)
    }
  }

  public async get(url: string): Promise<httpResponseOrError> {
    try {
      const encodedUrl = encodeURI(url)
      const result = await axios.get(encodedUrl, { timeout: this.requestTimeout })
      return this.responseParser(result)
    } catch (err) {
      return this.createHttpError(err)
    }
  }

  private responseParser(response: AxiosResponse<any>): httpResponseOrError {
    if (response !== null) {
      if (response !== undefined) {
        if ("data" in response) {
          return JSON.stringify(response.data)
        } else {
          return this.createHttpError(new Error("NoDataField"))
        }
      } else {        
        return this.createHttpError(new Error("UndefinedAxiosResponse"))
      }
    } else {
      return this.createHttpError(new Error("NullAxiosResponse"))
    }
  }

  private createHttpError(error: Error): ErrorInternal {
    const httpError: ErrorInternal = {
      error: error
    }
    return httpError
  }
}
