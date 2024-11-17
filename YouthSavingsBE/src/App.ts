import express from "express";
import { connectDB } from "./db/connect";
import dotenv from "dotenv";
import routerFixedData from "./routes/Fixeddata";
import "express-async-errors";
import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

//ROUTES
app.use("/api/v1/fixeddata", routerFixedData);

//Errors handler
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
