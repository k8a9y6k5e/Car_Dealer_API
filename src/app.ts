import express from "express";
const app = express();

import errorHandler from './error-handler/error-handler.js';

//routers
import brandRouter from "./router/brand-router.js";

app.use(express.json());

app.use('/brand', brandRouter);

app.use(errorHandler);

export default app;