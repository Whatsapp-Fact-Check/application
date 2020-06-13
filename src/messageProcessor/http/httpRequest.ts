import axios, { AxiosResponse } from "axios"

export interface PythonRequest {
  text: string
}
export interface HttpError {
  error: string
}

export default class HttpRequest {
  public async post(url: string, data: PythonRequest): Promise<string> {
    try {
      const result = await axios.post(url, data, { timeout: 2000 })
      return this.responseParser(result)
    } catch (err) {
      return JSON.stringify(this.createHttpError(err.message))
    }

    //still have to set timeout as a global constant
  }

  private responseParser(response: AxiosResponse<any>): string {
    let httpErrorObject: HttpError
    if (response !== null) {
      if (response !== undefined) {
        if ("data" in response) {
          return JSON.stringify(response.data)
        } else {
          httpErrorObject = this.createHttpError("NoDataField")
          return JSON.stringify(httpErrorObject)
        }
      } else {
        httpErrorObject = this.createHttpError("UndefinedAxiosResponse")
        return JSON.stringify(httpErrorObject)
      }
    } else {
      httpErrorObject = this.createHttpError("NullAxiosResponse")
      return JSON.stringify(httpErrorObject)
    }
  }

  private createHttpError(error: string): HttpError {
    const messageHttpError: HttpError = {
      error: error
    }
    return messageHttpError
  }
}
