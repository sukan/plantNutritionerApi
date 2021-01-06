"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const error_middleware_1 = require("./shared/middleware/error.middleware");
const mongodb_1 = require("./shared/config/mongodb");
class Init {
    constructor(controllers) {
        this.app = express();
        this.connectToTheDatabase();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }
    initializeMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(cors());
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
    initializeControllers(controllers) {
        controllers.map((controller) => this.app.use("/", controller.router));
    }
    listen() {
        this.app.listen(process.env.PORT || 8080, () => {
            console.log(`Connected to ${process.env.PORT || 8080}`);
        });
    }
    connectToTheDatabase() {
        mongoose
            .connect(mongodb_1.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
            .then(() => console.log("MDB connected"))
            .catch((error) => console.log(error));
    }
}
exports.default = Init;
//# sourceMappingURL=init.js.map