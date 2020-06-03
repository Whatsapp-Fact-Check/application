import { RegisterMessageProcessor } from "@/messageRouter/messageRouter"
import { MessageProcessor } from "../messageProcessor"
import { MessageRequest } from "@/messageRequest/messageRequest"
import { MessageResponse } from "@/messageResponse/messageResponse"

@RegisterMessageProcessor
export class MessageTextProcessor implements MessageProcessor {
  type: string
  processMessage(message: MessageRequest): Promise<MessageResponse> {
    return new Promise<MessageResponse>((resolve, reject) => {
      // fazer requisicao http para o banco
      //instanciar e retornar messageresponse
      // falta implementar interface de comunicacao com db
      // dbResponseString = get_result_db
      // dataBaseResponseObject = dataBaseResponseParser(dbResponse)
      // return new MessageResponse(findMessagetype(dataBaseResponseObject), dataBaseResponseObject)
    })
  }
  constructor() {
    this.type = "text"
  }

  private findMessageResponseType(message: string) {
    //if DatabaseResponse(Checado) == null no hit, else hit
  }
}
