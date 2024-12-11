import express from "express";
import "express-async-errors";
import { connectDB } from "./db/connect";
import dotenv from "dotenv";
import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/MiddleWareError";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  routerUpdatingData,
  routerFixedData,
  routerAuth,
  routerMagicLink,
  routerRefreshToken,
  routerlogOut,
} from "./barrel/routerBarrel";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cookieParser());

// extra security packages
app.use(helmet());
app.use(xss());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
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
app.use("/api/v1/auth/login", routerAuth);
app.use("/api/v1/magicLink", routerMagicLink);
app.use("/api/v1/updatingdata", routerUpdatingData);
app.use("/api/v1/refresh", routerRefreshToken);
app.use("/api/v1/logout", routerlogOut);

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
