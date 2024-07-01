import cors from "cors";
import express from "express";
import rootRoute from "./routes/rootRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static("."));

app.use(rootRoute);

app.listen(8080);
export default app;
