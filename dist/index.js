"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const init_1 = require("./init");
// Load Controllers
const authentication_controller_1 = require("./authentication/authentication.controller");
const deficiency_controller_1 = require("./deficiency/deficiency.controller");
const products_controller_1 = require("./products/products.controller");
const research_controller_1 = require("./research/research.controller");
const verification_controller_1 = require("./verification/verification.controller");
const app = new init_1.default([
    new authentication_controller_1.default(),
    new deficiency_controller_1.default(),
    new products_controller_1.default(),
    new research_controller_1.default(),
    new verification_controller_1.default()
]);
app.listen();
//# sourceMappingURL=index.js.map