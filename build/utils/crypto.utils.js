"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRandomString = void 0;
const node_crypto_1 = require("node:crypto");
const genRandomString = () => (0, node_crypto_1.randomBytes)(32).toString("hex");
exports.genRandomString = genRandomString;
//# sourceMappingURL=crypto.utils.js.map