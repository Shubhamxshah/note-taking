import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth";
import cookieParser from "cookie-parser";
import { blogRouter } from "./routes/blog";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.use("/auth", authRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`)
})
