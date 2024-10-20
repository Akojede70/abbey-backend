"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomAPIError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.default = CustomAPIError;
