const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const movieRouter = require("./routes/movieRoutes");

require("./config/googleStrategy");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://final-project-smoky-theta.vercel.app",
      process.env.API_URL,
    ],
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(passport.initialize());
app.use(cookieParser());

// Routes
app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", movieRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
