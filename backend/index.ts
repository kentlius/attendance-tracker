import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "node:path";

import { authMiddleware } from "./src/middleware/auth.middleware.js";

import authRouter from "./src/routes/auth.route.js";
import userRouter from "./src/routes/user.route.js";
import employeeRouter from "./src/routes/employee.route.js";
import recordRouter from "./src/routes/record.route.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(morgan("dev"));

// app.use(authMiddleware.verifyRequest);
app.use(authMiddleware.validateRequest);

app.use("/uploads", express.static("uploads"));

app.use("/", authRouter);
app.use("/users", userRouter);
app.use("/employees", employeeRouter);
app.use("/records", recordRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
