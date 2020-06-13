import axios from "axios"

export interface PythonRequest {
  text: string
}
export interface HttpError {
  error: string
}

export default class HttpRequest {
  public async post(url: string, data: PythonRequest, timeout: number): Promise<string> {
    const response = await axios.post(url, data, { timeout: timeout })
    let httpErrorObject: HttpError

    if (response !== null) {
      if (response != undefined) {
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
