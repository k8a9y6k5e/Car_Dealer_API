import express from "express";
const app = express();

//routers
import brandRouter from "./router/brand-router.js";

app.use(express.json());

app.use('/brand', brandRouter);

export default app;