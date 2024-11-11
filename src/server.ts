import express from "express";
import cors from "cors";
import { connectToMongo, port, servicesSetUp } from "./environment";
import { kafkaInit } from "./kafka/kafka";
import { requestLog } from "./middleware/requestLog";
import router from "./routes/router";
import { errorHandler } from "./middleware/errorHandler";
import { pollingRequestsSetUp } from "./middleware/pollingRequest";

const app = express();

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(requestLog)
  .use("/api", router)
  .use(errorHandler)
  .listen(port, () => {
    servicesSetUp();
    console.log(`Server is running op port ${port}`);
  });
