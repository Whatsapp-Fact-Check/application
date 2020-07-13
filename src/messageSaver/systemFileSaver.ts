import { MessageSaverInterface, saveMessageResponse } from "./messageSaver"
import { ErrorInternal } from "@/error/errorInternal"
import * as fs from "fs"

export class SystemFileSaver implements MessageSaverInterface {
  private filename = "../savedMessages.txt"
  constructor() {}

  save(data: string): Promise<saveMessageResponse> {
    return new Promise<saveMessageResponse>((resolve, reject) => {
      fs.appendFile(this.filename, data, (err) => {
        if (err) {
          const internalError: ErrorInternal = {
            error: err
          }
          reject(internalError)
        }
        resolve(true)
      })
    })
  }
}
