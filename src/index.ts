import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";
import { databaseConnection } from "./config/database";
import * as dotenv from "dotenv";
import { secureHeapUsed } from "crypto";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 204,
  credentials:true,
  methods: "GET, POST, PUT, DELETE",
};

app.use(cors(corsOptions));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

databaseConnection();
app.use("/", router());

server.listen(PORT, () => {
  console.log("server running at ", PORT);
});
