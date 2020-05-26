import { __decorate } from "tslib";
import { RegisterMessageProcessor } from "../messageRouter";
let MessageTextProcessor = /** @class */ (() => {
    let MessageTextProcessor = class MessageTextProcessor {
        constructor() {
            this.type = "text";
        }
        processMessage(message) {
            return new Promise((resolve, reject) => {
            });
        }
    };
    MessageTextProcessor = __decorate([
        RegisterMessageProcessor
    ], MessageTextProcessor);
    return MessageTextProcessor;
})();
export { MessageTextProcessor };
//# sourceMappingURL=messageTextProcessor.js.map