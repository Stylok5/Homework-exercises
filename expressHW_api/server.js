import express from "express";
import logger from "./middleware/logger.js";
import fallback from "./middleware/fallback.js";
import connectToDb from "./utils/db.js";
import router from "./router.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = 4100;

app.use(express.json());
app.use(logger);
app.use(router);
app.use(fallback);
app.use(errorHandler);

const startingServer = async () => {
  await connectToDb();
  console.log("Database connected");
  app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
};
startingServer();
