"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
const express_1 = __importDefault(require("express")); // using express types, use ES6 imports
const todos_1 = __importDefault(require("./routes/todos"));
const body_parser_1 = require("body-parser");
const app = express_1.default();
app.use(body_parser_1.json());
app.use("/todos", todos_1.default);
// app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {})
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(3000);
