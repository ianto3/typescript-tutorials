// const express = require("express");
import express, {Request, Response, NextFunction} from "express"; // using express types, use ES6 imports
import todoRoutes from "./routes/todos";
import {json} from "body-parser";

const app = express();

app.use(json());

app.use("/todos", todoRoutes);

// app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {})
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({message: err.message});
});

app.listen(3000);