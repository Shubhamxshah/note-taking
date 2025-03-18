import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth";
import cookieParser from "cookie-parser";
import { noteRouter } from "./routes/endpoints";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.use("/auth", authRouter);
app.use("/note", noteRouter);

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`)
})
