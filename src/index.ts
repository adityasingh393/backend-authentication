import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

const app = express();
const PORT = 4000;

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("server running at 4000");
});

const MONGO_URL =
  "mongodb+srv://aditya:singh@cluster0.r4adt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// mongoose.Promise = Promise;

mongoose.connect(MONGO_URL).then(() => {
  console.log("connections db done");
});

mongoose.connection.on("error", (error: Error) => console.log(error));

app.use('/',router());