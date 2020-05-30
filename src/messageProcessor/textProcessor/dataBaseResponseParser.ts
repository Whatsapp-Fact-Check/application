//responsavel por receber uma string e retornar o objeto dataBaseResponse

import { DataBaseResponse } from "@/messageProcessor/textProcessor/dataBaseResponse"

export class DataBaseResponseParser {
    constructor() {}

    parse(databaseResponseString: string): DataBaseResponse {
        let dataBaseResponse: DataBaseResponse = JSON.parse(databaseResponseString)
        return dataBaseResponse
    }
}