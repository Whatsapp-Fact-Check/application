import axios, { AxiosResponse } from "axios"

export interface HttpError {
  error: string
}


export default class HttpRequest {
  public async post(url: string, data: any): Promise<string | HttpError> {
    try {
      const encodedUrl = encodeURI(url)
      const result = await axios.post(encodedUrl, data, { timeout: 10000 })
      return this.responseParser(result)
    } catch (err) {
      return this.createHttpError(err.message)
    }
  }

  public async get(url: string): Promise<string | HttpError> {
    try {
      const encodedUrl = encodeURI(url)
      const result = await axios.get(encodedUrl, { timeout: 10000 })
      return this.responseParser(result)
    } catch (err) {
      return this.createHttpError(err.message)
    }
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
