import { MessageSaver } from './messageSaver'
import { MessageRequest } from '@/messageRequest/messageRequest'
import { MessageRequestText } from '@/messageRequest/messageRequestText'
import { MessageResponse } from '@/messageResponse/messageResponse'
import { MessageResponseNoHit } from '@/messageResponse/messageResponseNoHIt'
import { MessageResponseErrorInternal } from '@/messageResponse/messageResponseError'
import { ErrorToNotifyUser } from '@/error/errorToNotifyUser'

test("should append messageRequest, messageResponse and formatedMessage in txt file", () => {
    const instance = new MessageSaver()
    const msgRequest: MessageRequestText = {
        type: "text",
        id: "whatsapp:+5561999822909",
        timestamp: new Date(),
        text: "Jair bolsonaro"
    }
    const msgResponse: MessageResponseNoHit = {
        type: "NoHit"        
    }
    const message: string = "Não encontramos nada correspondente 😓\n\n" +
    "Tente mandar de novo mudando um pouco a frase, usando sinônimos... Pode ser que isso ajude a gente a encontrar!"

    instance.saveMessage(msgRequest, msgResponse, message)
  })

  test("should append ErrorToNotifyUser, messageResponseErrorInternal and formatedMessage in txt file", () => {
    const instance = new MessageSaver()
    const msgRequest: ErrorToNotifyUser = {
        errorType: "unsupportedMedia",
        error: new Error("ErrorToNotifyUser")
    }
    const msgResponse: MessageResponseErrorInternal = {
        type: "Error",
        errorInternal: {error: new Error("Internal error")}        
    }
    const message: string = "Encontramos um problema interno ao processar sua requisição, estamos trabalhando para corrigir 👨‍💻"

    instance.saveMessage(msgRequest, msgResponse, message)
  })