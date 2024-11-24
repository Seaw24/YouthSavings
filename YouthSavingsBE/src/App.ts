import express from "express";
import "express-async-errors";
import { connectDB } from "./db/connect";
import dotenv from "dotenv";
import routerFixedData from "./routes/fixeddata";
import routerAuth from "./routes/auth";
import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/MiddleWareError";
import routerUpdatingData from "./routes/updatingData";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// extra security packages
app.use(helmet());
app.use(express.json());
app.use(xss());
app.use(cors());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

//ROUTES
app.get("/", (req, res) => {
  res.send("Youth Savings API");
});
app.use("/api/v1/fixeddata", routerFixedData);
app.use("/api/v1/auth", routerAuth);
app.use("/api/v1/updatingdata", routerUpdatingData);

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
