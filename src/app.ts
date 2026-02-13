import express from "express";
const app = express();

//middlewares
import errorHandler from './error-handler/error-handler.js';
import httpLog from './middleware/http-log.js';

//routers
import brandRouter from "./router/brand-router.js";

app.use(express.json());

app.use(httpLog);

app.use('/brand', brandRouter);

app.use(errorHandler);

export default app;