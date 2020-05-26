/**
 * Recebe a mensagem do whatsapp, escolhe um processador de mensagem, chama um messageFormater
 * Lembrar de importar algo do messageProcessor
 */
const implementations = [];
function GetImplementations() {
    return implementations;
}
export function RegisterMessageProcessor(ctor) {
    implementations.push(ctor);
    return ctor;
}
export class MessageRouter {
    constructor() {
        this.messageProcessors = {};
        const implementations = GetImplementations();
        implementations.forEach(MessageProcessor => {
            const instance = new MessageProcessor();
            this.messageProcessors[instance.type] = instance;
        });
    }
    async processMessage(message) {
        const type = this.findType(message);
        const messageProcessor = this.messageProcessors[type];
        const result = await messageProcessor.processMessage(message);
        return this.format(result);
    }
    findType(message) {
        return "text";
    }
    format(message) {
        //Chama por tipo. Usa o mesmo lance do processador
        return "";
    }
}
//# sourceMappingURL=messageRouter.js.map